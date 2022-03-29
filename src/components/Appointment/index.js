import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Form from "./Form";
import Confirm from "./Confirm";
import useVisualMode from "components/hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const DELETING = "DELETING";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  function confirmDelete() {
    transition(DELETING);
    props.cancleInterview(props.id).then(() => {
      transition(EMPTY);
    });
  }

  function cancel(id) {
    transition(CONFIRM);
  }

  function editInterview(id) {
    transition(EDIT);
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
            onEdit={editInterview}
          />
        )}
        {mode === EDIT && (
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
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
            onCancel={() => back()}
            onSave={save}
          />
        )}
        {mode === DELETING && <Status message={"Deleting"} />}
        {mode === SAVING && <Status />}
      </article>
    </Fragment>
  );
}
