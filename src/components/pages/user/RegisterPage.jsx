import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {checkEmail, getLangIso2} from "../../../utils";
import {useUserService} from "../../services/useUserService";
import {AuthContext} from "../../AuthState";
import {Label} from "../../form/Label";
import {EmailInput} from "../../form/EmailInput";
import {PasswordInput} from "../../form/PasswordInput";
import {Form} from "../../form/Form";
import {SubmitButton} from "../../form/SubmitButton";

export const RegisterPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {t} = useTranslation();
  const auth = useContext(AuthContext);
  const {register} = useUserService();

  const {from} = location.state || {from: "/shelf"};
  const langIso2 = getLangIso2();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth.user) {
      navigate(from, {replace: true});
    }
  }, []);

  const checkForm = () => {
    if (!checkEmail(email)) {
      return t("invalid.email");
    }
    if (password.length < 5) {
      return t("invalid.password");
    }
    return null;
  }

  const submit = async () => {
    const user = await register({email, password, langIso2});
    auth.login(user);
    navigate(from, {replace: true});
  }

  return auth.user
    ? (<></>)
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

          <Label for="password" title={t("label.password")}/>
          <PasswordInput
            id="password"
            maxLength="64"
            required="required"
            onChange={(e) => setPassword(e.target.value)}/>

          <div className="form_bottom">
            <SubmitButton value={t("action.register")}/>
          </div>
        </Form>
      </div>
    );
}
