import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {AuthContext} from "../../AuthState";

export const BookLearn = (props) => {

  const {t} = useTranslation();

  const {user} = useContext(AuthContext);

  const getTrainingLink = (mode) => {
    return encodeURI("/training?mode=" + mode + "&book=" + props.book.id);
  }

  return (
    <div className="learn_block book-info-header">
      <div className="learn_header">{t("book.training")}</div>
      <div className="learn_btn_block">
        <Link to={user ? getTrainingLink("memory") : "/user/login?next=" + getTrainingLink("memory")}
           className="w-button w-clearfix btn learn">{t("book.train.memory")}</Link>
      </div>
      <div className="learn_btn_block">
        <Link to={user ? getTrainingLink("audition") : "/user/login?next=" + getTrainingLink("audition")}
           className="w-button w-clearfix btn learn">{t("book.train.audition")}</Link>
      </div>
      {/*{user &&*/}
      {/*<div className="learn_description">Последнее занятие: 7 дней назад<br/>(Воскресенье, 23 сентября)</div>*/}
      {/*}*/}
      <div className="buy_block">
        {props.book.contentUrl &&
        <a href={props.book.contentUrl} className="link_more">
          <span className="txt_underline">{t("book.buy.text")}</span>
        </a>
        }
        {props.book.audioContentUrl &&
        <a href={props.book.audioContentUrl} className="link_more">
          <span className="txt_underline">{t("book.buy.audio")}</span>
        </a>
        }
      </div>
    </div>
  );
}
