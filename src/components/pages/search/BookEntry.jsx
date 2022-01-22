import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const BookEntry = (props) => {

  const {t} = useTranslation();

  return (
    <li className="book_item">

      {props.coverUrl &&
      <Link to={"/book/info/" + props.id}>
        <div className="book-cover">
          <img src={props.coverUrl} alt={props.title}/>
        </div>
      </Link>
      }

      {props.coverUrl &&
      <div className="progress">
        <Link to={"/book/info/" + props.id}>{props.title}</Link>
        <div className="words"><i>{props.author}</i></div>
        <div className="words">{t("book.info.language")}: <b>{props.language.nativeName}</b></div>
        <div className="words">{t("book.info.total.phrases")}: <b>{props.totalWords}</b></div>
        <div className="words">{t("book.info.unique.phrases")}: <b>{props.uniqueGroups}</b></div>
      </div>
      }

      {!props.coverUrl &&
      <div className="paper">
        <Link to={"/book/info/" + props.id} className="w-inline-block cover">
          <div className="title_block">
            <div className="title">{props.title.length > 60 ? props.title.substring(0, 50) + "..." : props.title}</div>
          </div>
          <div className="author">{props.author}</div>
        </Link>
      </div>
      }

      {!props.coverUrl &&
      <div className="progress">
        <div className="words">{t("book.info.language")}: <b>{props.language.nativeName}</b></div>
        <div className="words">{t("book.info.total.phrases")}: <b>{props.totalWords}</b></div>
        <div className="words">{t("book.info.unique.phrases")}: <b>{props.uniqueGroups}</b></div>
      </div>
      }
    </li>
  );
}
