import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDictionaryService} from "../../services/useDictionaryService";
import {useErrorService} from "../../services/useErrorService";
import {DictionaryTrain} from "./DictionaryTrain";
import {DictionaryInfo} from "./DictionaryInfo";
import {PhrasePanel} from "./PhrasePanel";

export const DictionaryPage = () => {

  const {t} = useTranslation();
  const [searchParams] = useSearchParams();
  const {handleServerError} = useErrorService();
  const {getDictionary} = useDictionaryService();

  const langIso2 = searchParams.get("lang");

  const [language, setLanguage] = useState(null);
  const [dictionary, setDictionary] = useState(null);

  const loadData = () => {
    getDictionary({langIso2})
      .then(data => {
        setDictionary(data.dictionary);
        setLanguage(data.language);
      })
      .catch(error => {
        handleServerError(error);
      });
  }

  useEffect(loadData, [langIso2]);

  return (
    <>
      {language &&
      <div className="w-container bookshelf_head">
        <h1 className="h1 book_header">{t("dictionary.title") + " — " + language.nativeName}</h1>
      </div>
      }

      <div className="w-container">
        {language &&
        <DictionaryTrain language={language}/>
        }
        {dictionary &&
        <DictionaryInfo {...dictionary}/>
        }
      </div>

      <PhrasePanel onChange={loadData}/>
    </>
  );
}
