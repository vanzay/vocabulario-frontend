import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, useSearchParams} from "react-router-dom";
import {useTrainingService} from "../../services/useTrainingService";
import {useDictionaryService} from "../../services/useDictionaryService";
import {useErrorService} from "../../services/useErrorService";
import {Shortcut} from "./Shortcut";
import {LetterInput} from "./LetterInput";
import {LetterSet} from "./LetterSet";

export const TrainingPage = () => {

  const {t} = useTranslation();
  const [searchParams] = useSearchParams();
  const {handleServerError} = useErrorService();
  const {getPronunciation} = useDictionaryService();
  const {getPhrases, sendAnswer} = useTrainingService();

  const mode = searchParams.get("mode");
  const langIso2 = searchParams.get("lang");
  const bookId = searchParams.get("book");

  const [level, setLevel] = useState("SINGLE");
  const [hintsCount, setHintsCount] = useState(0);
  const [pronunciation, setPronunciation] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerHandled, setAnswerHandled] = useState(false);
  const [items, setItems] = useState(null);

  const loadData = () => {
    getPhrases({mode, langIso2, bookId})
      .then(data => {
        setItems(data);
      })
      .catch(e => {
        handleServerError(e);
      });
  };

  useEffect(loadData, [mode, langIso2, bookId]);

  const loadPronunciation = () => {
    getPronunciation({phraseId: items[0].phrase.id})
      .then(data => {
        if (data.url) {
          const audio = new Audio(data.url);
          audio.addEventListener("ended", () => setPlaying(false));
          setPronunciation(audio);
          if (mode === "audition") {
            audio.play();
          }
        } else {
          // TODO next phrase? next hint?
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  const initPhrase = () => {
    if (!items || !items.length) {
      return;
    }

    setLevel("SINGLE");
    setHintsCount(0);
    setAnswer("");
    setAnswerHandled(false);
    setPronunciation(null);

    loadPronunciation();

    if ((mode === "memory" && items[0].memoryProgress < 50)
      || (mode === "audition" && items[0].auditionProgress < 25)) {
      applyHint(false);
    }

    // TODO run timer (depending on progress), when time is out then increase hintsCount
    // progress [0..25] -> 25
    // progress [25..50] -> 20
    // progress [50..75] -> 15
    // progress [75..100] -> 10
  };

  useEffect(initPhrase, [items, mode]);

  const playPronunciation = () => {
    if (pronunciation) {
      setPlaying(true);
      // TODO for Chrome you cant use .play() and .pause(). You must use .Play() and .Stop().
      pronunciation.play();
    }
  }

  const applyHint = (manual) => {
    if (answerHandled) {
      return;
    }
    if (manual) {
      setHintsCount(hintsCount + 1);
    }
    if (level === "SINGLE") {
      setAnswer("");
      setLevel("SEPARATED");
    } else if (level === "SEPARATED") {
      setLevel(pronunciation ? "AUDIO" : "ASSEMBLED");
    } else if (level === "AUDIO") {
      playPronunciation();
    }
  }

  const handleFlow = () => {
    if (answerHandled) {
      if (items.length === 1) {
        setItems(null);
        loadData();
      } else {
        setItems(items.slice(1));
      }
    } else {
      handleAnswer();
    }
  }

  const handleAnswer = () => {
    setAnswerHandled(true);

    if (mode === "memory") {
      playPronunciation();
    }

    sendAnswer({phraseId: items[0].phrase.id, answer: encodeURIComponent(answer), mode, hintsCount})
      .then(data => {
        // TODO data.points
      })
      .catch(e => {
        console.error(e);
      });
  };

  const onKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
      case "Escape":
        e.preventDefault();
        handleFlow();
        break;
      case "Tab":
        e.preventDefault();
        applyHint(true);
        break;
    }
  }

  return (
    <div className="w-section">
      <div className="w-container bookshelf_head">
        <h1
          className="h1 book_header">{mode === "audition" ? t("training.audition.title") : t("training.memory.title")}</h1>
        {/*<h4 className="h2">Оставшееся время занятия: 24:35</h4>*/}
      </div>

      {items && !items.length &&
      <div className="w-container bookshelf_empty">
        <p className="description training-no-phrases">{t("training.time.take.break")}</p>
        <Link to="/shelf" className="w-button w-clearfix btn">
          {t("training.try.another.book")}
        </Link>
      </div>
      }

      {items && items.length &&
      <div className="w-container study_container">
        <div className="training-block">
          {mode === "memory" &&
          <div className="translation-quest">{items[0].translation || "???"}</div>
          }
          {mode === "audition" &&
          <div className="translation-quest">
            <img src="/images/audio.png" alt="&#x25B6;" className="audio-play-btn" style={{opacity: playing ? 1 : 0.5}}
                 onClick={playPronunciation}/>
          </div>
          }

          <div className="answer-placeholder">
            {answerHandled && items[0].phrase.term !== answer &&
            <div className="correct-answer">{items[0].phrase.term}</div>
            }
            {!(answerHandled && items[0].phrase.term !== answer) && !["SINGLE", "SEPARATED"].includes(level) &&
            <LetterSet phrase={items[0].phrase.term}/>
            }
          </div>

          {level === "SINGLE" &&
          <input autoFocus readOnly={answerHandled} value={answer}
                 className={"w-input word_input" + (answerHandled ? " answer-" + (items[0].phrase.term === answer ? "ok" : "nok") : "")}
                 onChange={(e) => setAnswer(e.target.value)} onKeyDown={onKeyDown}/>
          }

          {level !== "SINGLE" &&
          <LetterInput length={items[0].phrase.term.length} readOnly={answerHandled}
                       className={"w-input word_input" + (answerHandled ? " answer-" + (items[0].phrase.term === answer ? "ok" : "nok") : "")}
                       onChange={(value) => setAnswer(value)} onKeyDown={onKeyDown}/>
          }

          <div className="learn_description study">&nbsp;</div>

          <Shortcut value="Tab" title={t("training.hint")} clickHandler={() => applyHint(true)}/>

          <div className="spacer"/>

          <Shortcut value="Enter" title={t("training.check.answer")} clickHandler={handleFlow}/>

          <div className="spacer"/>

          <Shortcut value="Esc" title={t("training.skip")} clickHandler={handleFlow}/>
        </div>
      </div>
      }
    </div>
  );
}
