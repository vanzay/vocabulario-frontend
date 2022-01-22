import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const Footer = () => {

  const {t} = useTranslation();

  return (
    <div className="w-container footer_container">
      <div className="w-clearfix footer_social">
        <div className="w-widget w-widget-facebook facebook">
          <div className="fb-like">&nbsp;</div>
        </div>
      </div>
      <div className="footer_txt">{t("app.copyright")}</div>
      <div className="footer_txt">
        <Link to={"/about"} className="footer_link">{t("app.about")}</Link>
        &nbsp;|&nbsp;
        <Link to={"/help"} className="footer_link">{t("app.help")}</Link>
      </div>
    </div>
  );
}
