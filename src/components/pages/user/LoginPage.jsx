import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {AuthContext} from "../../AuthState";
import {useUserService} from "../../services/useUserService";
import {useErrorService} from "../../services/useErrorService";

export const LoginPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {t} = useTranslation();
  const auth = useContext(AuthContext);
  const {handleServerError} = useErrorService();
  const {login} = useUserService();

  const {from} = location.state || {from: "/shelf"};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (auth.user) {
      navigate(from, {replace: true});
    }
  }, []);

  const submit = async () => {
    if (submitted) {
      return;
    }

    setSubmitted(true);

    try {
      const user = await login({email, password});
      auth.login(user);
      navigate(from, {replace: true});
    } catch (e) {
      handleServerError(e);
      setSubmitted(false);
    }
  }

  return auth.user
    ? (<></>)
    : (
      <div className="w-form form_upload">
        <label htmlFor="email" className="field_label">{t("label.username")}</label>
        <input id="email" autoFocus type="text" className="w-input input"
               onChange={(e) => setEmail(e.target.value)}/>

        <label htmlFor="password" className="field_label">{t("label.password")}</label>
        <input id="password" type="password" className="w-input input"
               onChange={(e) => setPassword(e.target.value)}/>

        <Link to={"/user/register"} className="link_more">{t("action.register")}</Link>
        <Link to={"/user/restore"} className="link_more">{t("login.forgot")}</Link>

        <div className="form_bottom">
          <button type="button" className={"w-button " + (submitted ? "btn-disabled" : "btn")}
                  onClick={submit}>{t("action.enter")}</button>
        </div>
      </div>
    );
}
