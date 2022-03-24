import React from "react";
import "components/InterviewListItem.scss";
import classNames from "classnames";

function InterviewListItem(props) {
  
  const interviewClass = classNames(
    "interviewers__item",
    { "interviewers__item--selected": props.selected }
    
  );


  return (
    <li className={interviewClass} onClick={props.setInterviewer} selected={props.selected}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

export default InterviewListItem;
