import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {useTranslation} from "react-i18next";
import {AuthContext} from "../../AuthState";
import {useBookService} from "../../services/useBookService";
import {getCurrentPage} from "../../../utils";
import {useErrorService} from "../../services/useErrorService";
import {BookInfo} from "./BookInfo";
import {BookLearn} from "./BookLearn";
import {PhraseTab} from "./PhraseTab";

export const BookPage = () => {

  const params = useParams();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {user} = useContext(AuthContext);
  const {handleServerError} = useErrorService();
  const {getBook} = useBookService();

  const bookId = params.id;

  const [book, setBook] = useState(null);
  const [summary, setSummary] = useState(null);
  const [currentTab, setCurrentTab] = useState("1");

  const loadData = () => {
    getBook({bookId})
      .then(data => {
        setBook(data.book);
        setSummary(data.summary);
      })
      .catch(error => {
        handleServerError(error);
      });
  }

  useEffect(loadData, [bookId, user]);

  const changeTab = (tab) => {
    if (currentTab === tab) {
      return;
    }

    if (!user) {
      navigate("/user/login", {replace: true, state: {from: getCurrentPage()}});
      return;
    }

    setCurrentTab(tab);
  }

  return book
    ? (
      <>
        <Helmet>
          <title>{book.title}</title>
          <meta name="description" content={book.title + " " + book.author + " vocabulary"}/>
          <meta name="title" content={book.title + " " + book.author}/>
        </Helmet>

        <div className="w-container bookshelf_head">
          {/*<Link to="/shelf" class="control_link nav">*/}
          {/*  <span className="txt_underline">Вернуться в Справчники</span>*/}
          {/*</Link>*/}
          <h1 className="h1 book_header">{book.title}</h1>
          <h4 className="h2">{book.author}</h4>
        </div>

        <div className="w-container">
          <BookLearn book={book}/>
          <BookInfo book={book} summary={summary}/>
        </div>

        <div className="w-container">
          <div className="w-tabs">
            <div className="w-tab-menu w-clearfix tabs_menu">
            <span className={"w-tab-link w-inline-block tab_link" + (currentTab === "1" ? " w--current" : "")}
                  onClick={() => changeTab("1")}>
              <span>{t("book.phrase.tab.new")}</span>&nbsp;
              <span className="small_txt">{summary != null ? (book.uniqueGroups - summary.totalPhrases) : ""}</span>
            </span>
              <span className={"w-tab-link w-inline-block tab_link" + (currentTab === "2" ? " w--current" : "")}
                    onClick={() => changeTab("2")}>
              <span>{t("book.phrase.tab.added")}</span>&nbsp;
                <span className="small_txt">{summary != null ? summary.totalPhrases : ""}</span>
            </span>
            </div>
            <div className="w-tab-content">
              <PhraseTab active={currentTab === "1"} inDictionary={false} load={true} toolbar={true}
                         onChange={loadData}/>
              <PhraseTab active={currentTab === "2"} inDictionary={true} load={!!user} toolbar={false}
                         onChange={loadData}/>
            </div>
          </div>
        </div>
      </>)
    : (<></>);
}
