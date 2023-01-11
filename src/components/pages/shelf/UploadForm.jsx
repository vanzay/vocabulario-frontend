import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useShelfService} from "../../services/useShelfService";
import {Modal} from "../../Modal";
import {PulseLoader} from "../../PulseLoader";
import {SubmitButton} from "../../form/SubmitButton";
import {Form} from "../../form/Form";
import {Label} from "../../form/Label";
import {TextInput} from "../../form/TextInput";

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
  const {uploadBook} = useShelfService();

  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const checkForm = () => {
    if (!file) {
      return t("file.cant.be.empty");
    }

    if (!isFileFormatSupported(file.name)) {
      return t("wrong.file.type");
    }

    if (typeof FileReader !== "undefined" && file.size > MAX_FILE_SIZE) {
      return t("max.file.size");
    }

    return null;
  }

  const submit = async () => {
    const book = await uploadBook({title, file});
    props.onUploadSuccess(book);
    setTitle("");
    setFile(null);
    setSubmitted(false);
  }

  return props.open
    ? (
      <Modal onClose={props.onClose}>
        <div className="w-form form_upload">
          <h3 className="form_head">{t("shelf.upload.title")}</h3>

          <Form checkHandler={checkForm}
                submitHandler={submit}>

            <Label for="title" title={t("label.book.title")}/>
            <TextInput
              id="title"
              maxLength="128"
              onChange={(e) => setTitle(e.target.value)}/>

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
              <input id="content" type="file" onChange={(e) => setFile(e.target.files[0])}/>
              <span>{t("action.choose.file")}</span>
            </label>

            {file &&
              <div>{file.name}</div>
            }

            <PulseLoader loading={submitted}/>

            <div className="form_bottom">
              <SubmitButton value={t("action.upload")}/>
            </div>
          </Form>
        </div>
      </Modal>
    )
    : (<></>);
}
