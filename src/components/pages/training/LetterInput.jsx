import React, {useRef} from "react";

export const LetterInput = (props) => {

  const letterInputRefs = useRef([]);

  const buildValueFromLetters = () => {
    let result = "";
    for (let i = 0; i < letterInputRefs.current.length; i++) {
      if (letterInputRefs.current[i]) {
        result += letterInputRefs.current[i].value;
      }
    }
    return result;
  }

  const onKeyDown = (e) => {
    let letterIndex = e.target.dataset["index"];
    if (e.key.length === 1) {
      e.preventDefault();
      letterInputRefs.current[letterIndex].value = e.key;
      if ((+letterIndex + 1) < props.length) {
        letterInputRefs.current[+letterIndex + 1].focus();
      }
      props.onChange(buildValueFromLetters());
    } else if (e.key === "Backspace") {
      e.preventDefault();
      e.target.value = "";
      if (letterIndex > 0) {
        letterInputRefs.current[letterIndex - 1].focus();
      }
      props.onChange(buildValueFromLetters());
    } else {
      props.onKeyDown(e);
    }
  }

  let inputs = [];
  for (let i = 0; i < props.length; i++) {
    inputs.push(
      <div key={i} className="letter">
        <input ref={el => letterInputRefs.current[i] = el}
               autoFocus={i === 0}
               className={props.className}
               readOnly={props.readOnly}
               data-index={i}
               maxLength="1"
               onKeyDown={onKeyDown}/>
      </div>
    )
  }

  return (
    <div className="answer-by-letter">
      {inputs}
    </div>
  );
}
