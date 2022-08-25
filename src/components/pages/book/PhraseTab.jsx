import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {AuthContext} from "../../AuthState";
import {useBookService} from "../../services/useBookService";
import {useDictionaryService} from "../../services/useDictionaryService";
import {useErrorService} from "../../services/useErrorService";
import {getCurrentPage, getLangIso2} from "../../../utils";
import {PulseLoader} from "../../PulseLoader";
import {PhraseList} from "./PhraseList";

export const PhraseTab = (props) => {

  const params = useParams();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {user} = useContext(AuthContext);
  const {handleServerError} = useErrorService();
  const {getPhrases} = useBookService();
  const {addPhrases} = useDictionaryService();

  const bookId = params.id;
  const langIso2 = getLangIso2();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState([]);

  const loadData = () => {
    setLoading(true);
    getPhrases({bookId, inDictionary: props.inDictionary, langIso2, offset})
      .then(data => {
        if (offset === 0) {
          setItems(data);
        } else {
          setItems(prevItems => [...prevItems, ...data]);
        }
        setLoading(false);
      })
      .catch(error => {
        handleServerError(error);
        setLoading(false);
      });
  };

  useEffect(loadData, [bookId, langIso2, offset]);

  const loadMore = () => {
    setOffset(items.length);
  }

  const toggleSelectAll = (e) => {
    if (!user) {
      navigate("/user/login", {replace: true, state: {from: getCurrentPage()}});
      return;
    }

    items.forEach(item => {
      item.base.checked = e.target.checked;
    });

    setItems([...items]);
  }

  const updateUserVocabulary = async (onStudying) => {
    if (!user) {
      navigate("/user/login", {replace: true, state: {from: getCurrentPage()}});
      return;
    }

    if (submitted) {
      return;
    }

    const idList = items
      .filter(item => item.base.checked)
      .map(item => item.base.phraseId);
    if (!idList.length) {
      return;
    }

    setSubmitted(true);

    try {
      await addPhrases({bookId: params.id, onStudying, idList});
      setItems(items.filter(item => !idList.includes(item.base.phraseId)));
      props.onChange();
      setSubmitted(false);
    } catch (e) {
      handleServerError(e);
      setSubmitted(false);
    }
  }

  return (
    <div className={"w-tab-pane" + (props.active ? " w--tab-active" : "")}>
      <div className="w-form table_form w-clearfix">
        {props.toolbar &&
        <div className="w-checkbox w-clearfix checkbox table limited">
          <input id="select_all" type="checkbox" className="w-checkbox-input checkbox_input"
                 onChange={toggleSelectAll}/>
          <label htmlFor="select_all" className="w-form-label checkbox_label">{t("label.select.all")}</label>
        </div>
        }
        {props.toolbar &&
        <div className="table_controls">
          <span className={"w-button btn_upload first" + (submitted ? " btn-disabled" : "")}
                onClick={() => updateUserVocabulary(false)}>
            <span>{t("action.add.familiar")}</span>
          </span>
          <span className={"w-button btn_upload last_control" + (submitted ? " btn-disabled" : "")}
                onClick={() => updateUserVocabulary(true)}>
            <span>{t("action.add.unknown")}</span>
          </span>
        </div>
        }
      </div>

      {props.load &&
      <PhraseList inDictionary={props.inDictionary} items={items}/>
      }

      <PulseLoader loading={loading}/>

      {!loading &&
      <span className="link_more" onClick={loadMore}>
        <span className="txt_underline">{t("action.show.more")}</span>
      </span>
      }
    </div>
  );
}
