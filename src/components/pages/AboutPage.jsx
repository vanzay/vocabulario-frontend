import React from "react";
import {Trans, useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export const AboutPage = () => {

  const {t} = useTranslation();

  return (
    <div className="w-container">
      <div className="w-section">
        <div className="w-container bookshelf_head">
          <h1 className="h1">{t("about.title")}</h1>
        </div>
        <p><Trans i18nKey="about.short.description"/></p>
        <p><Trans i18nKey="about.intro"/></p>
        <p><Trans i18nKey="about.more.details"/> <Link to="/help">{t("app.help")}</Link>.</p>
        <p><Trans i18nKey="about.contact"/> <a href="mailto:support@vocabular.io">support@vocabular.io</a>.</p>
      </div>
    </div>
  );
}
