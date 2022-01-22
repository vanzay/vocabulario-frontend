import React from "react";

export const Shortcut = (props) => {

  return (
    <span className="study_link" onClick={props.clickHandler}>
      <span className="shortcut">{props.value}</span>&nbsp;<span className="txt_underline">{props.title}</span>
    </span>
  );
}
