import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export const DictionaryTrain = (props) => {

  const {t} = useTranslation();

  return (
    <div className="learn_block dictionary-info-header">
      <div className="learn_header">{t("book.training")}</div>
      <div className="learn_btn_block">
        <Link to={"/training?mode=memory&lang=" + props.language.iso2} className="w-button w-clearfix btn learn">
          {t("book.train.memory")}
        </Link>
      </div>
      <div className="learn_btn_block">
        <Link to={"/training?mode=audition&lang=" + props.language.iso2} className="w-button w-clearfix btn learn">
          {t("book.train.audition")}
        </Link>
      </div>
      {/*<div className="learn_description">Последнее занятие: 7 дней назад<br/>(Воскресенье, 23 сентября)</div>*/}
    </div>
  );
}
