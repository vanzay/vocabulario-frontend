import React, {useState} from "react";

export const PhraseEntry = (props) => {

  const [checked, setChecked] = useState(false);

  const togglePhrase = (e) => {
    if (e.type === "change") {
      return;
    }

    if (e.target.className === "term_link") {
      props.onEdit(props);
      return;
    }

    // props.phrase.checked - for update after "select all", checked - for update after row click
    props.phrase.checked = !props.phrase.checked;
    setChecked(props.phrase.checked);
  }

  return (
    <tr className={"highlighted " + (props.onStudying ? "unknown-phrase" : "known-phrase")} onClick={togglePhrase}>
      <td className="checkbox">
        <input type="checkbox" className="checkbox_input word_check" checked={!!props.phrase.checked}
               onChange={togglePhrase}/>
      </td>
      <td className="translation">
        <span>{props.translation || "-"}</span>
      </td>
      <td>
        <div className={"checkbox_label word" + (props.phrase.baseForm ? " base-form" : "")}>
          <span className="term_link">{props.phrase.term}</span>
        </div>
      </td>
      <td className="frequency numeric">
        {props.onStudying &&
        <span>{props.memoryProgress + "% / " + props.auditionProgress + "%"}</span>
        }
      </td>
    </tr>
  );
}
