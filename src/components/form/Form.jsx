import React, {useState} from "react";
import {useAlert} from "react-alert";
import {FormProvider} from "./FormProvider";
import {useErrorService} from "../services/useErrorService";

export const Form = ({children, checkHandler, submitHandler}) => {

  const alert = useAlert();
  const {handleServerError} = useErrorService();

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async () => {
    if (submitted) {
      return;
    }

    const error = checkHandler && checkHandler();
    if (error) {
      alert.error(error);
      return;
    }

    setSubmitted(true);

    try {
      if (submitHandler) {
        await submitHandler();
      }
      setSubmitted(false);
    } catch (e) {
      handleServerError(e);
      setSubmitted(false);
    }
  }

  return (
    <>
      <FormProvider onSubmit={onSubmit} submitted={submitted}>
        {children}
      </FormProvider>
    </>
  );
}
