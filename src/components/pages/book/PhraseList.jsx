import React from "react";
import {useTranslation} from "react-i18next";
import {PhraseEntry} from "./PhraseEntry";

export const PhraseList = (props) => {

  const {t} = useTranslation();

  return (
    <table className="data-list zebra selectable">
      <thead>
      <tr className="not-selectable">
        <th className="checkbox">&nbsp;</th>
        <th className="legend_translation">{t("header.phrase.translation")}</th>
        <th className="legend_word">{t("header.phrase.term")}</th>
        <th className="legend_frequency">{t("book.phrase.term.frequency")}</th>
      </tr>
      </thead>
      <tbody>
      {
        props.items.map(item => {
          return <PhraseEntry key={item.base.phraseId} {...item} />
        })
      }
      </tbody>
    </table>
  );
}
