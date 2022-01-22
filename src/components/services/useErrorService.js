import {useContext} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useAlert} from "react-alert";
import {getCurrentPage} from "../../utils";
import {AuthContext} from "../AuthState";

export const useErrorService = () => {

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const alert = useAlert();
  const {t} = useTranslation();

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "USER_EXISTS_ALREADY":
        return t("register.user.exists.already");
      case "USER_NOT_FOUND":
        return t("login.wrong.auth.params");
      case "INVALID_TOKEN":
        return t("outdated.link");
      case "INVALID_FILE":
        return t("file.cant.be.empty");
      case "UNSUPPORTED_FILE_TYPE":
        return t("wrong.file.type");
      case "UPLOAD_LIMIT_EXCEEDED":
        return t("upload.limitation");
      case "UNSUPPORTED_LANGUAGE":
        return t("unsupported.language");
      case "BOOK_NOT_FOUND":
        return t("book.not.found");
      case "PHRASE_NOT_FOUND":
        return t("phrase.not.found");
      default:
        return t("unexpected.error");
    }
  }

  const handleServerError = (error) => {
    const {response} = error;
    if (response) {
      if (response.status === 401) {
        auth.logout();
        navigate("/user/login", {replace: true, state: {from: getCurrentPage()}});
      } else {
        alert.error(getErrorMessage(response.data.code || "UNEXPECTED_ERROR"));
      }
    } else {
      alert.error(getErrorMessage("UNEXPECTED_ERROR"));
      console.error(error);
    }
  }

  return {
    handleServerError
  }
}
