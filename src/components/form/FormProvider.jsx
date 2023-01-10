import React, {createContext} from "react";

export const FormContext = createContext({});

export const FormProvider = ({children, ...rest}) => {
  return (
    <FormContext.Provider value={rest}>
      {children}
    </FormContext.Provider>
  )
}
