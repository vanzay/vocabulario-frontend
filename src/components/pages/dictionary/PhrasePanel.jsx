import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDictionaryService} from "../../services/useDictionaryService";
import {useErrorService} from "../../services/useErrorService";
import {PhraseList} from "./PhraseList";
import {PhraseForm} from "./PhraseForm";

export const PhrasePanel = (props) => {

  const {t} = useTranslation();
  const [searchParams] = useSearchParams();
  const {handleServerError} = useErrorService();
  const {getPhrases, updateStudyingStatus, removePhrases, exportPhrases} = useDictionaryService();

  const langIso2 = searchParams.get("lang");

  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState({
    langIso2,
    term: "",
    onStudying: false,
    page: 0
  });
  const [items, setItems] = useState([]);
  const [phraseToEdit, setPhraseToEdit] = useState(null);

  useEffect(() => {
    // TODO delay + abort previous
    getPhrases(filter)
      .then(data => {
        if (filter.page === 0) {
          setItems(data);
        } else {
          setItems(prevItems => [...prevItems, ...data]);
        }
      });
  }, [filter]);

  const changeOnStudying = (e) => {
    setFilter({...filter, onStudying: e.target.checked, page: 0});
  }

  const changeTerm = (e) => {
    setFilter({...filter, term: e.target.value, page: 0});
  }

  const loadMore = () => {
    setFilter({...filter, page: filter.page + 1});
  }

  const updateOnStudying = async (onStudying) => {
    await submit(async (selectedItems) => {
      await updateStudyingStatus({onStudying, idList: selectedItems.map(item => item.id)});
      selectedItems.forEach(item => item.onStudying = onStudying);
      setItems(items);
    });
  }

  const remove = async () => {
    await submit(async (selectedItems) => {
      let idList = selectedItems.map(item => item.id);
      await removePhrases({idList});
      // TODO offset issue for loadMore
      setItems(items.filter(item => !idList.includes(item.id)));
    });
  }

  const exportToCsv = async () => {
    await submit(async (selectedItems) => {
      await exportPhrases({format: "csv", idList: selectedItems.map(item => item.id)});
    });
  }

  const submit = async (handler) => {
    if (submitted) {
      return;
    }

    const selectedItems = items.filter(item => item.phrase.checked);
    if (!selectedItems.length) {
      return;
    }

    setSubmitted(true);

    try {
      await handler(selectedItems);
      props.onChange();
      setSubmitted(false);
    } catch (e) {
      handleServerError(e);
      setSubmitted(false);
    }
  }

  const toggleSelectAll = (e) => {
    items.forEach(item => {
      item.phrase.checked = e.target.checked;
    });

    setItems([...items]);
  }

  const onEditSuccess = (translation) => {
    for (let item of items) {
      if (item.id === phraseToEdit.id) {
        item.translation = translation;
        break;
      }
    }
    setItems([...items]);
    closeEditForm();
  }

  const openEditForm = (phrase) => {
    setPhraseToEdit(phrase);
  }

  const closeEditForm = () => {
    setPhraseToEdit(null);
  }

  return (
    <>
      <div className="w-container">
        <div className="w-form table_form w-clearfix">
          <div className="w-checkbox w-clearfix checkbox table limited">
            <input id="on_studying" type="checkbox" className="w-checkbox-input checkbox_input"
                   onChange={changeOnStudying}/>
            <label htmlFor="on_studying"
                   className="w-form-label checkbox_label">{t("label.show.only.on_studying")}</label>
          </div>
          <div className="table_controls">
            <span className={"w-button btn_upload first" + (submitted ? " btn-disabled" : "")}
                  onClick={() => updateOnStudying(true)}>{t("dictionary.add.to.studying")}</span>
            <span className={"w-button btn_upload first" + (submitted ? " btn-disabled" : "")}
                  onClick={() => updateOnStudying(false)}>{t("dictionary.remove.from.studying")}</span>
            <span className={"w-button btn_upload first" + (submitted ? " btn-disabled" : "")}
                  onClick={remove}>{t("dictionary.remove.from.vocabulary")}</span>
            <button type="button" className={"w-button btn_upload last_control" + (submitted ? " btn-disabled" : "")}
                    onClick={exportToCsv}>{t("dictionary.export.to.csv")}</button>
          </div>
        </div>

        <div className="w-checkbox w-clearfix checkbox table limited">
          <input id="select_all" type="checkbox" className="w-checkbox-input checkbox_input"
                 onChange={toggleSelectAll}/>
          <label htmlFor="select_all" className="w-form-label checkbox_label">{t("label.select.all")}</label>
        </div>

        <input type="text" placeholder={t("dictionary.search.term")} className="w-input input search" maxLength="50"
               onChange={changeTerm}/>

        <PhraseList items={items} onEdit={openEditForm}/>

        <span className="link_more" onClick={loadMore}>
          <span className="txt_underline">{t("action.show.more")}</span>
        </span>
      </div>

      <PhraseForm userPhrase={phraseToEdit} onClose={closeEditForm} onEditSuccess={onEditSuccess}/>
    </>
  );
}
