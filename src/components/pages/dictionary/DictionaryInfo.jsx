import React from "react";
import {useTranslation} from "react-i18next";

export const DictionaryInfo = (props) => {

  const {t} = useTranslation();
  const progress = Math.round(props.knownPhrases * 100 / (props.totalPhrases === 0 ? 1 : props.totalPhrases));
  const progressLevel = progress >= 75 ? "high" : (progress >= 50 ? "medium" : "low");

  return (
    <div className="w-clearfix info_block dictionary-info-header">
      <div className="info_block_head"><span className="info_icon">i</span><span>{t("label.dictionary.info")}</span>
      </div>

      <div className="w-clearfix info_row">
        <div className="info_legend"><span className="txt_background">{t("dictionary.info.total.phrases")}:</span></div>
        <div className="info_value">{props.totalPhrases}</div>
      </div>
      <div className="w-clearfix info_row">
        <div className="info_legend"><span className="txt_background">{t("dictionary.info.familiar.phrases")}:</span></div>
        <div className="info_value">{props.knownPhrases}</div>
      </div>
      <div className="w-clearfix info_row">
        <div className="info_legend"><span className="txt_background">{t("dictionary.info.unknown.phrases")}:</span>
        </div>
        <div className="info_value">{props.unknownPhrases}</div>
      </div>

      <div className="w-clearfix info_row last_info">
        <div className="info_legend"><span className="txt_background">{t("label.progress")}:</span></div>
        <div className="info_value"><span className={"comfort " + progressLevel}>{progress}%</span>
        </div>
      </div>
      <div className="progress_bar">
        <div className={"progress_bar_fill " + progressLevel} style={{width: progress + "%"}}/>
      </div>
    </div>
  );
}
