import React, {useState} from "react";
import Button from "../Button"

function Form() {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);


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
        /*
          This must be a controlled component
          your code goes here
        */
      />
    </form>
    <InterviewerList 
      /* your code goes here */
    />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger {/* your code goes here */}>Cancel</Button>
        <Button confirm {/* your code goes here */}>Save</Button>
      </section>
    </section>
</main>
);
}

export default Form;