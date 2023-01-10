import React, {useContext} from "react";
import {FormContext} from "./FormProvider";

export const PasswordInput = (props) => {

  const formContext = useContext(FormContext);

  const onKeyDown = (e) => {
    if (e.key === "Enter" && formContext.onSubmit) {
      e.preventDefault();
      formContext.onSubmit();
    }
  };

  return (
    <input className="w-input input"
           type="password"
           onKeyDown={onKeyDown}
           {...props}
    />
  );
}
