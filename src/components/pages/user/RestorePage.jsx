import React, {useState} from "react";
import {Trans, useTranslation} from "react-i18next";
import {useAlert} from "react-alert";
import {useUserService} from "../../services/useUserService";
import {useErrorService} from "../../services/useErrorService";
import {checkEmail} from "../../../utils";

export const RestorePage = () => {

  const {t} = useTranslation();
  const alert = useAlert();
  const {handleServerError} = useErrorService();
  const {sendRestoreEmail} = useUserService();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async () => {
    if (submitted) {
      return;
    }

    if (!checkEmail(email)) {
      alert.error(t("invalid.email"));
      return;
    }

    setSubmitted(true);

    try {
      await sendRestoreEmail({email});
      setSent(true);
    } catch (e) {
      handleServerError(e);
      setSubmitted(false);
    }
  }

  return sent
    ? (
      <div className="w-container bookshelf_empty">
        <h1 className="h1 centered">{t("account.access")}</h1>
        <p className="description training-no-phrases">
          <Trans i18nKey="forgot.password.sent" values={{email}}/>
          &nbsp;
          <a href="mailto:support@vocabular.io">support@vocabular.io</a>
        </p>
      </div>
    )
    : (
      <div className="w-form form_upload">
        <label htmlFor="email" className="field_label">{t("label.username")}</label>
        <input id="email" autoFocus type="text" className="w-input input"
               onChange={(e) => setEmail(e.target.value)}/>

        <div className="form_bottom">
          <button type="button" className={"w-button " + (submitted ? "btn-disabled" : "btn")}
                  onClick={submit}>{t("action.restore")}</button>
        </div>
      </div>
    );
}
