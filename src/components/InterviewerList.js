import React from "react";
import "components/InterviewerList.scss";
import InterviewListItem from "components/InterviewListItem";

export default function InterviewerList(props) {
  const { interviewers, onChange } = props;

  const interviewerList = interviewers.map((currentInterviewer) => {
    return (
      <InterviewListItem
        key={currentInterviewer.id}
        name={currentInterviewer.name}
        avatar={currentInterviewer.avatar}
        selected={currentInterviewer.id === props.value}
        setInterviewer={() => onChange(currentInterviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  )
}