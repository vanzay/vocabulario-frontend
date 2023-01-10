import React, {useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useUserService} from "../../services/useUserService";
import {Label} from "../../form/Label";
import {PasswordInput} from "../../form/PasswordInput";
import {Form} from "../../form/Form";
import {SubmitButton} from "../../form/SubmitButton";

export const ChangePasswordPage = () => {

  const navigate = useNavigate();
  const {t} = useTranslation();
  const [searchParams] = useSearchParams();
  const {changePassword} = useUserService();

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");

  const checkForm = () => {
    if (password.length < 5) {
      return t("invalid.password");
    }
    return null;
  }

  const submit = async () => {
    await changePassword({uid, token, password});
    navigate("/user/login", {replace: true});
  }

  return (
    <div className="w-form form_upload">
      <Form checkHandler={checkForm}
            submitHandler={submit}>

        <Label for="password" title={t("label.password")}/>
        <PasswordInput
          id="password"
          autoFocus={true}
          maxLength="64"
          required="required"
          onChange={(e) => setPassword(e.target.value)}/>

        <div className="form_bottom">
          <SubmitButton value={t("action.change.password")}/>
        </div>
      </Form>
    </div>
  );
}
