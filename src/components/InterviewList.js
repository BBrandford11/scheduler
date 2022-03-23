import React from "react";
import InterviewListItem from "./InterviewListItem";
import "components/InterviewList.scss"

function Interviewlist(props) {

  const inter = props.interviewers.map((person) => {
    return (
      <InterviewListItem 
        key = {person.id}
        name = {person.name}
        avatar = {person.avatar}
        selected={person.id === props.value}
        setInterviewer={() => props.onChange(person.id)}
      />
    )
  })
  return (
    <section className="interviewers" >
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> {inter} </ul>
    </section>
  );
}

export default Interviewlist;
