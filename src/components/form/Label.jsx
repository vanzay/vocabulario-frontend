import React from "react";

export const Label = (props) => {

  return (
      <label className="field_label"
             htmlFor={props.for}
             title={props.title}>
        {props.title}
        {props.children}
      </label>
  );
}
