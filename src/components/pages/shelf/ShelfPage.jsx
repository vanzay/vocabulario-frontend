import React, {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useErrorService} from "../../services/useErrorService";
import {useShelfService} from "../../services/useShelfService";
import {BookEntry} from "./BookEntry";
import {UploadForm} from "./UploadForm";

export const ShelfPage = () => {

  const {t} = useTranslation();
  const [searchParams] = useSearchParams();
  const {handleServerError} = useErrorService();
  const {getBooks} = useShelfService();

  const [uploadFormOpen, setUploadFormOpen] = useState(searchParams.get("upload") === "true");
  const [page, setPage] = useState(0);
  const [items, setItems] = useState(null);

  const loadData = () => {
    getBooks({page})
      .then(data => {
        if (page === 0) {
          setItems(data);
        } else {
          setItems(prevItems => [...prevItems, ...data]);
        }
      })
      .catch(error => {
        handleServerError(error);
      });
  };

  useEffect(loadData, [page]);

  const loadMore = () => {
    setPage(page + 1);
  }

  const onUploadSuccess = (book) => {
    closeUploadForm();
    if (!items) {
      setItems([book]);
    } else {
      setItems([book, ...items]);
    }
  }

  const openUploadForm = () => {
    setUploadFormOpen(true);
  }

  const closeUploadForm = () => {
    setUploadFormOpen(false);
  }

  return (
    <>
      <UploadForm open={uploadFormOpen} onClose={closeUploadForm} onUploadSuccess={onUploadSuccess}/>

      {items && !items.length &&
      <div className="w-container bookshelf_empty">
        <h1 className="h1 centered">{t("shelf.list.title")}</h1>
        <p className="description">{t("shelf.intro")}</p>
        <span className="w-button w-clearfix btn" onClick={openUploadForm}>
          <span className="plus_icon">+</span> <span>{t("action.upload.book")}</span>
        </span>
        <span>&nbsp;{t("or")}&nbsp;</span>
        <Link to="/" className="w-button w-clearfix btn">
          <span className="plus_icon">&#x2315;</span> <span>{t("action.find.book")}</span>
        </Link>
      </div>
      }

      {items && items.length &&
      <div className="w-section">
        <div className="w-container bookshelf_head">
          <h1 className="h1">{t("shelf.list.title")}</h1>
          <span className="w-button w-clearfix btn control" onClick={openUploadForm}>
            <span className="plus_icon">+</span> <span>{t("action.upload.book")}</span>
          </span>
          {/* TODO <Link to="/shelf/edit" className="control_link">Rename or delete</Link>*/}
        </div>

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
      }
    </>
  );
}
