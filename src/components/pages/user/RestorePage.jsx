import React, {useState} from "react";
import {Trans, useTranslation} from "react-i18next";
import {useUserService} from "../../services/useUserService";
import {checkEmail} from "../../../utils";
import {Label} from "../../form/Label";
import {EmailInput} from "../../form/EmailInput";
import {Form} from "../../form/Form";
import {SubmitButton} from "../../form/SubmitButton";

export const RestorePage = () => {

  const {t} = useTranslation();
  const {sendRestoreEmail} = useUserService();

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const checkForm = () => {
    if (!checkEmail(email)) {
      return t("invalid.email");
    }
    return null;
  }

  const submit = async () => {
    await sendRestoreEmail({email});
    setSent(true);
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
        <Form checkHandler={checkForm}
              submitHandler={submit}>

          <Label for="email" title={t("label.username")}/>
          <EmailInput
            id="email"
            autoFocus={true}
            maxLength="64"
            required="required"
            onChange={(e) => setEmail(e.target.value)}/>

          <div className="form_bottom">
            <SubmitButton value={t("action.restore")}/>
          </div>
        </Form>
      </div>
    );
}
