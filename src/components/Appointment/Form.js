import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");



  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    props.onSave(student, interviewer, props.status);
  }
  
  const cancel = () => {
    reset();
    props.onCancel();    
  };

  const reset = () => {
    setStudent("");
    setInterviewer(null)
  };

  // const interview = props.onSave(student,interviewer)
  // props.bookInterview(interview)


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        
        <InterviewerList
          value={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>Save</Button>
          
        </section>
      </section>
    </main>
  );
}

export default Form;
