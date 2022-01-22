import React from "react";
import {useTranslation} from "react-i18next";

export const NotFoundPage = () => {

  const {t} = useTranslation();

  return (
    <div className="page-not-found">{t("page.not.found")}</div>
  );
}
