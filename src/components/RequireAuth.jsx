import {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {AuthContext} from "./AuthState";
import {getCurrentPage} from "../utils";

export const RequireAuth = () => {

  const {user} = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/user/login" state={{from: getCurrentPage()}}/>;
  }

  return <Outlet/>;
}
