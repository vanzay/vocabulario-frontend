import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useAlert} from "react-alert";
import {checkEmail, getLangIso2} from "../../../utils";
import {useUserService} from "../../services/useUserService";
import {useErrorService} from "../../services/useErrorService";
import {AuthContext} from "../../AuthState";

export const RegisterPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {t} = useTranslation();
  const auth = useContext(AuthContext);
  const alert = useAlert();
  const {handleServerError} = useErrorService();
  const {register} = useUserService();

  const {from} = location.state || {from: "/shelf"};
  const langIso2 = getLangIso2();

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

    if (!checkEmail(email)) {
      alert.error(t("invalid.email"));
      return;
    }

    if (password.length < 5) {
      alert.error(t("invalid.password"));
      return;
    }

    setSubmitted(true);

    try {
      const user = await register({email, password, langIso2});
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

        <div className="form_bottom">
          <button type="button" className={"w-button " + (submitted ? "btn-disabled" : "btn")}
                  onClick={submit}>{t("action.register")}</button>
        </div>
      </div>
    );
}
