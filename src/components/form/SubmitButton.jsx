import React, {useContext} from "react";
import {FormContext} from "./FormProvider";

export const SubmitButton = (props) => {

  const formContext = useContext(FormContext);

  const submit = async () => {
    await formContext.onSubmit();
  }

  return (
    <input className={"w-button " + (formContext.submitted ? "btn-disabled" : "btn")}
           type="button"
           onClick={submit}
           {...props}
    />
  );
}
