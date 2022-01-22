import React, {createContext} from "react";
import {useProvideAuth} from "./services/useProvideAuth";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {

  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      {props.children}
    </AuthContext.Provider>
  )
}
