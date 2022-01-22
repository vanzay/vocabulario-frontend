import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const BookEntry = (props) => {

  const {t} = useTranslation();

  const comfortLevel = props.comfort >= 75 ? "high" : (props.comfort >= 50 ? "medium" : "low");

  return (
    <li className="book_my">
      <div className="paper">
        <Link to={"/book/info/" + props.book.id} className="w-inline-block cover">
          <div className="title_block">
            <div
              className="title">{props.book.title.length > 60 ? props.book.title.substring(0, 50) + "..." : props.book.title}</div>
          </div>
          <div className="author">{props.book.author}</div>
        </Link>
      </div>
      <div className="progress">
        <div className="percent">{t("label.comfort") + ": " + props.comfort + "%"}</div>
        <div className="progress_bar">
          <div className={"progress_bar_fill " + comfortLevel} style={{width: props.comfort + "%"}}/>
        </div>
        <div className="words">{t("shelf.book.progress", {
          added: props.totalPhrases,
          uniqueGroups: props.book.uniqueGroups
        })}</div>
      </div>
    </li>
  );
}
