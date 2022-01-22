import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDictionaryService} from "../../services/useDictionaryService";
import {useErrorService} from "../../services/useErrorService";
import {LanguageEntry} from "./LanguageEntry";

export const LanguagesPage = () => {

  const navigate = useNavigate();
  const {t} = useTranslation();
  const {handleServerError} = useErrorService();
  const {getLanguages} = useDictionaryService();

  const [items, setItems] = useState(null);

  const loadData = () => {
    getLanguages()
      .then(data => {
        if (data.length === 1) {
          navigate("/dictionary/terms?lang=" + data[0].iso2);
        } else {
          setItems(data);
        }
      })
      .catch(error => {
        handleServerError(error);
      });
  }

  useEffect(loadData, []);

  return (
    <>
      {items && !items.length &&
      <div className="w-container bookshelf_empty">
        <h1 className="h1 centered">{t("dictionary.title")}</h1>
        <p className="description training-no-phrases">{t("dictionary.empty")}</p>
        <Link to="/shelf" className="w-button w-clearfix btn">{t("dictionary.add.from.book")}</Link>
      </div>
      }

      {items && items.length &&
      <div className="w-section">
        <div className="w-container bookshelf_head">
          <h1 className="h1 book_header">{t("dictionary.title")}</h1>
        </div>

        <div className="w-container">
          {
            items.map(item => {
              return <LanguageEntry key={item.iso2} {...item}/>
            })
          }
        </div>
      </div>
      }
    </>
  );
}
