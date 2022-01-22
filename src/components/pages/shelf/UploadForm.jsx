import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useAlert} from "react-alert";
import {useErrorService} from "../../services/useErrorService";
import {useShelfService} from "../../services/useShelfService";
import {Modal} from "../../Modal";
import {PulseLoader} from "../../PulseLoader";

const MAX_FILE_SIZE = 3 * 1024 * 1024;  // TODO 3mb

const isFileFormatSupported = (filename) => {
  const filenameParts = filename.match(/^.+\.(.+)$/);
  if (filenameParts.length === 2) {
    const ext = filenameParts[1].toLowerCase();
    if (ext === "txt" || ext === "epub" || ext === "pdf" || ext === "srt") {
      return true;
    }
  }
  return false;
}

export const UploadForm = (props) => {

  const {t} = useTranslation();
  const alert = useAlert();
  const {handleServerError} = useErrorService();
  const {uploadBook} = useShelfService();

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    file: null
  });

  const checkUploadForm = () => {
    if (submitted) {
      return;
    }

    if (!form.file) {
      alert.error(t("file.cant.be.empty"));
      return false;
    }

    if (!isFileFormatSupported(form.file.name)) {
      alert.error(t("wrong.file.type"));
      return false;
    }

    if (typeof FileReader !== "undefined" && form.file.size > MAX_FILE_SIZE) {
      alert.error(t("max.file.size"));
      return false;
    }

    return true;
  }

  const submit = async () => {
    if (submitted) {
      return;
    }

    if (!checkUploadForm()) {
      return;
    }

    setSubmitted(true);

    try {
      const book = await uploadBook(form);
      props.onUploadSuccess(book);
    } catch (e) {
      handleServerError(e);
      setSubmitted(false);
    }
  }

  return props.open
    ? (
      <Modal onClose={props.onClose}>
        <div className="w-form form_upload">
          <h3 className="form_head">{t("shelf.upload.title")}</h3>

          <label htmlFor="title" className="field_label">{t("label.book.title")}</label>
          <input id="title" type="text" className="w-input input" maxLength="100"
                 onChange={(e) => setForm({...form, title: e.target.value})}/>

          {/*<label htmlFor="author" className="field_label">{t("label.book.author")}</label>*/}
          {/*<input id="author" type="text" className="w-input input"/>*/}

          {/*<input id="translated" type="checkbox" value="1"/>*/}
          {/*<label htmlFor="translated" className="field_label">{t("label.book.is.translation")}</label>*/}

          {/*<label htmlFor="cover_url" className="field_label">{t("label.book.cover.url")}</label>*/}
          {/*<input id="cover_url" type="text" placeholder="http://" className="w-input input"/>*/}

          {/*<label htmlFor="content_url" className="field_label">{t("label.book.content.url")}</label>*/}
          {/*<input id="content_url" type="text" placeholder="http://" className="w-input input"/>*/}

          {/*<label htmlFor="audio_content_url" className="field_label">{t("label.book.audio.content.url")}</label>*/}
          {/*<input id="audio_content_url" type="text" placeholder="http://"*/}
          {/*       className="w-input input"/>*/}

          <label htmlFor="content" className="field_label">{t("label.book.content")}</label>
          {/*<div className="form_hint">Укажите URL файла:</div>*/}
          {/*<input id="URL" type="email" placeholder="http://" className="w-input input"/>*/}
          {/*<div className="form_hint">Или загрузите текст с вашего компьютера</div>*/}
          <label className="w-button btn_upload">
            <input id="content" type="file" onChange={(e) => setForm({...form, file: e.target.files[0]})}/>
            <span>{t("action.choose.file")}</span>
          </label>

          {form.file &&
          <div>{form.file.name}</div>
          }

          <PulseLoader loading={submitted}/>

          <div className="form_bottom">
            <button type="button" className={"w-button " + (submitted ? "btn-disabled" : "btn")}
                    onClick={submit}>{t("action.upload")}</button>
          </div>

          {/*<div className="w-form-done"><p>Thank you! Your submission has been received!</p></div>*/}
        </div>
      </Modal>
    )
    : (<></>);
}
