import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDictionaryService} from "../../services/useDictionaryService";
import {useErrorService} from "../../services/useErrorService";
import {Modal} from "../../Modal";

export const PhraseForm = (props) => {

  const {t} = useTranslation();
  const {handleServerError} = useErrorService();
  const {saveTranslation} = useDictionaryService();

  const [translation, setTranslation] = useState("");

  const submit = async () => {
    try {
      await saveTranslation({userPhraseId: props.userPhrase.id, translation});
      props.onEditSuccess(translation);
    } catch (e) {
      handleServerError(e);
    }
  }

  return props.userPhrase
    ? (
      <Modal onClose={props.onClose}>
        <div className="w-form w-clearfix form_upload">
          <h3 className="form_head">{props.userPhrase.phrase.term}</h3>

          <label htmlFor="translation" className="field_label">{t("label.translation")}</label>
          <input autoFocus id="translation" type="text" name="translation" className="w-input input" maxLength="64"
                 defaultValue={props.userPhrase.translation} onChange={(e) => setTranslation(e.target.value)}/>

          <div className="form_bottom">
            <span className="w-button btn" onClick={submit}>{t("action.save")}</span>
          </div>
        </div>
      </Modal>
    )
    : (<></>);
}
