import React, {useContext, useState} from "react";
import ReactDOM from "react-dom";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../AuthState";
import {getCurrentPage} from "../../../utils";

export const PhraseEntry = (props) => {

  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  const [checked, setChecked] = useState(!!props.base.checked);
  const [tooltipStyle, setTooltipStyle] = useState({display: "none"});

  const togglePhrase = (e) => {
    if (!user) {
      navigate("/user/login", {replace: true, state: {from: getCurrentPage()}});
      return;
    }

    if (e.type === "change" || props.base.onStudying != null) {
      return;
    }

    // props.base.checked - for update after "select all", checked - for update after row click
    props.base.checked = !props.base.checked;
    setChecked(props.base.checked);
  }

  const showTooltip = (e) => {
    const rect = ReactDOM.findDOMNode(e.target).getBoundingClientRect();
    setTooltipStyle({
      left: rect.right + 15,
      top: rect.top,
    });
  }

  const hideTooltip = (e) => {
    setTooltipStyle({display: "none"});
  }

  return (
    <tr className={"highlighted" + (props.base.onStudying != null ? " not-selectable" : "")} onClick={togglePhrase}>
      <td className="checkbox">
        {props.base.onStudying == null &&
        <input type="checkbox" className="checkbox_input word_check" checked={!!props.base.checked}
               onChange={togglePhrase}/>
        }
        {props.base.onStudying != null &&
        <span>&nbsp;</span>
        }
      </td>
      <td className="translation">
        {props.base.translation &&
        <span>{props.base.translation}</span>
        }
        {!props.base.translation &&
        <span className={user ? "" : "no-translation"}>-</span>
        }
      </td>
      <td>
        <div className={"checkbox_label word" + (props.base.baseForm ? " base-form" : "")}>{props.base.term}</div>
      </td>
      <td className="frequency numeric"
          onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>{props.groupFrequency}</td>
      <td>
        {/* TODO clean zebra style for tooltip */}
        <table className="tooltip-data" style={tooltipStyle}>
          <tbody>
          {props.base.frequency &&
          <tr key={props.base.phraseId + props.base.term}>
            <td className="tooltip-word">{props.base.term}</td>
            <td className="tooltip-frequency">{props.base.frequency}</td>
          </tr>
          }
          {
            props.phrases
              .filter(item => !!item.frequency)
              .map(item => {
                return (
                  <tr key={item.phraseId + item.term}>
                    <td className="tooltip-word">{item.term}</td>
                    <td className="tooltip-frequency">{item.frequency}</td>
                  </tr>
                )
              })
          }
          </tbody>
        </table>
      </td>
    </tr>
  );
}
