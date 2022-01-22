import React from "react";
import {useTranslation} from "react-i18next";

export const BookInfo = (props) => {

  const {t} = useTranslation();
  const comfort = props.summary != null ? props.summary.comfort : 0;
  const comfortLevel = comfort >= 75 ? "high" : (comfort >= 50 ? "medium" : "low");

  return (
    <div className="w-clearfix info_block book-info-header">
      <div className="info_block_head"><span className="info_icon">i</span><span>{t("label.book.info")}</span></div>

      <div className="w-clearfix info_row">
        <div className="info_legend"><span className="txt_background">{t("book.info.language")}:</span></div>
        <div className="info_value">{props.book.language.nativeName}</div>
      </div>
      <div className="w-clearfix info_row">
        <div className="info_legend"><span className="txt_background">{t("book.info.total.phrases")}:</span></div>
        <div className="info_value">{props.book.totalWords}</div>
      </div>
      <div className="w-clearfix info_row">
        <div className="info_legend"><span className="txt_background">{t("book.info.unique.phrases")}:</span></div>
        {/*${book.uniqueWords}*/}
        <div className="info_value">{props.book.uniqueGroups}</div>
      </div>

      <div className="w-clearfix info_row">
        <div className="info_legend"><span className="txt_background">{t("book.info.in.vocabulary")}:</span></div>
        <div className="info_value">{props.summary != null ? props.summary.totalPhrases : "?"}</div>
      </div>
      <div className="w-clearfix info_row">
        <div className="info_legend"><span className="txt_background">{t("book.info.unknown")}:</span></div>
        <div
          className="info_value">{props.summary != null ? (props.summary.totalPhrases - props.summary.knownPhrases) : "?"}</div>
      </div>
      <div className="w-clearfix info_row last_info">
        <div className="info_legend"><span className="txt_background">{t("label.reading.comfort")}:</span></div>
        <div className="info_value">
          {!props.summary &&
          <span>?</span>
          }
          {props.summary &&
          <span className={"comfort " + comfortLevel}>{comfort + "%"}</span>
          }
        </div>
      </div>
      <div className="progress_bar">
        <div className={"progress_bar_fill " + comfortLevel} style={{width: comfort + "%"}}/>
      </div>
    </div>
  );
}
