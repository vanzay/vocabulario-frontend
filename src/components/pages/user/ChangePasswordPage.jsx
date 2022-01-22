import React, {useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAlert} from "react-alert";
import {useTranslation} from "react-i18next";
import {useUserService} from "../../services/useUserService";
import {useErrorService} from "../../services/useErrorService";

export const ChangePasswordPage = () => {

  const navigate = useNavigate();
  const {t} = useTranslation();
  const [searchParams] = useSearchParams();
  const alert = useAlert();
  const {handleServerError} = useErrorService();
  const {changePassword} = useUserService();

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const [submitted, setSubmitted] = useState(false);
  const [password, setPassword] = useState("");

  const submit = async () => {
    if (submitted) {
      return;
    }

    if (password.length < 5) {
      alert.error(t("invalid.password"));
      return;
    }

    setSubmitted(true);

    try {
      await changePassword({uid, token, password});
      navigate("/user/login", {replace: true});
    } catch (e) {
      handleServerError(e);
      setSubmitted(false);
    }
  }

  return (
    <div className="w-form form_upload">
      <label htmlFor="password" className="field_label">{t("label.password")}</label>
      <input id="password" type="password" autoFocus className="w-input input"
             onChange={(e) => setPassword(e.target.value)}/>

      <div className="form_bottom">
        <button type="button" className={"w-button " + (submitted ? "btn-disabled" : "btn")}
                onClick={submit}>{t("action.change.password")}</button>
      </div>
    </div>
  );
}
