import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "components/hooks/useVisualMode";
import { transformSync } from "@babel/core";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const DELETING = "DELETING";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR _ SAVE";
const ERROR_DELETE = "ERROR _ DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer, status) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview, status)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  }

  function confirmDelete() {
    transition(DELETING, true);
    props
      .cancleInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  }

  function cancel(id) {
    transition(CONFIRM);
  }

  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onCancel={cancel}
            onDelete={confirmDelete}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === EDIT && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back()}
            onSave={save}
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            status={true}
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            onCancel={() => back()}
            message="Are you sure you want to delete this interview session?"
            onConfirm={() => confirmDelete(props.id)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message={"Could not cancel appointment."}
            onClose={() => back()}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            message={"Could not save appointment."}
            onClose={() => back()}
          />
        )}
        {mode === DELETING && <Status message={"Deleting"} />}
        {mode === SAVING && <Status />}
      </article>
    </Fragment>
  );
}
