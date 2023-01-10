import React, {useContext} from "react";
import {FormContext} from "./FormProvider";

export const TextInput = (props) => {

  const formContext = useContext(FormContext);

  const onKeyDown = (e) => {
    if (e.key === "Enter" && formContext.onSubmit) {
      e.preventDefault();
      formContext.onSubmit();
    }
  };

  return (
    <input className="w-input input"
           type="text"
           onKeyDown={onKeyDown}
           {...props}
    />
  )
}
