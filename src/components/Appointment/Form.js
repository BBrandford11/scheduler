import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "components/InterviewerList";

function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const cancel = () => {
    reset();
    props.onCancel();    
  };

  const reset = () => {
    setStudent("");
    setInterviewer(null)
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          />
        </form>
        
        <InterviewerList
          value={props.interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onCancle={cancel}>
            Cancel
          </Button>
          <Button confirm onSave={props.onSave}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
