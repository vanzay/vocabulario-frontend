import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {Link, useSearchParams} from "react-router-dom";
import {useSearchService} from "../../services/useSearchService";
import {AutocompleteInput} from "../../AutocompleteInput";
import {BookEntry} from "./BookEntry";

export const SearchPage = () => {

  const navigate = useNavigate();
  const {t} = useTranslation();
  const [searchParams] = useSearchParams();
  const {getBooks, getBooksForAutocomplete} = useSearchService();

  const query = searchParams.get("q") || "";

  const [autocompleteQuery, setAutocompleteQuery] = useState(query);
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);

  const loadData = () => {
    getBooks({query, page})
      .then(data => {
        if (page === 0) {
          setItems(data);
        } else {
          setItems(prevItems => [...prevItems, ...data]);
        }
      });
  };

  useEffect(loadData, [query, page]);

  const loadMore = () => {
    setPage(page + 1);
  }

  const changeQuery = (value, finished) => {
    setAutocompleteQuery(value);
    if (finished) {
      navigate("/search?q=" + value);
    }
  }

  return (
    <div className="w-section">
      <div className="w-container">
        {/*{user &&*/}
        {/*<div style="font-size: 30px;text-align: center; padding: 20px; border: 1px solid #000; background-color: #aaa; color: #ff0000; margin-top: 10px">*/}
        {/*  SEXY BANNER:)*/}
        {/*</div>*/}
        {/*}*/}
        <div className="w-form table_form w-clearfix search-form">
          <div className="table_controls_front">
            <AutocompleteInput
              className="w-input input search front"
              value={autocompleteQuery}
              loadItems={getBooksForAutocomplete}
              getText={item => item.title + " " + item.author}
              onChange={changeQuery}/>
            <img src="/images/search.png" alt={t("action.find")} className="search-btn"
                 onClick={() => navigate("/search?q=" + autocompleteQuery)}/>
          </div>
          <Link to="/shelf?upload=true" className="w-button w-clearfix btn control">
            <span className="plus_icon">+</span> <span>{t("action.upload.book")}</span>
          </Link>
        </div>
        {/*<br/>*/}
        {/*<br/>*/}
        {/* select language automatically after page reloading */}
        {/*<input type="radio" id="all_lang" value=""/> <label htmlFor="all_lang">{t("label.all.languages")}</label>*/}
        {/*{*/}
        {/*  languages.map(item => {*/}
        {/*    return (*/}
        {/*      <>*/}
        {/*        <input type="radio" id={item.iso2 + "_lang"} value={item.iso2}/>*/}
        {/*        <label htmlFor={item.iso2 + "_lang"}>{item.nativeName}</label>*/}
        {/*      </>*/}
        {/*    )*/}
        {/*  })*/}
        {/*}*/}
        {/*<br/>*/}
        {/*<br/>*/}

        <ul className="w-list-unstyled w-clearfix books_list">
          {
            items.map(item => {
              return <BookEntry key={item.id} {...item} />
            })
          }
        </ul>

        <span className="link_more" onClick={loadMore}>
          <span className="txt_underline">{t("action.show.more")}</span>
        </span>
      </div>
    </div>
  );
}
