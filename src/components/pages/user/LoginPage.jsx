import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {AuthContext} from "../../AuthState";
import {useUserService} from "../../services/useUserService";
import {Form} from "../../form/Form";
import {EmailInput} from "../../form/EmailInput";
import {Label} from "../../form/Label";
import {PasswordInput} from "../../form/PasswordInput";
import {SubmitButton} from "../../form/SubmitButton";

export const LoginPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {t} = useTranslation();
  const auth = useContext(AuthContext);
  const {login} = useUserService();

  const {from} = location.state || {from: "/shelf"};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth.user) {
      navigate(from, {replace: true});
    }
  }, []);

  const checkForm = () => {
    return null;
  }

  const submit = async () => {
    const user = await login({email, password});
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

          <Link to={"/user/register"} className="link_more">{t("action.register")}</Link>
          <Link to={"/user/restore"} className="link_more">{t("login.forgot")}</Link>

          <div className="form_bottom">
            <SubmitButton value={t("action.enter")}/>
          </div>
        </Form>
      </div>
    );
}
