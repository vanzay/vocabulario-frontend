import React, {useState} from "react";

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const fisherYatesShuffle = (word) => {
  const letters = word.split("");
  for (let i = letters.length - 1; i >= 1; i--) {
    let j = randomInt(0, i - 1);    // here is modification, rand[0,i] in original algorithm
    let temp = letters[i];
    letters[i] = letters[j];
    letters[j] = temp;
  }
  return letters;
}

export const LetterSet = (props) => {

  const [shuffledLetters] = useState(fisherYatesShuffle(props.phrase));

  return (
    <div className="letter-set">
      {
        shuffledLetters.map((letter, index) => {
            return <div key={index} className="letter">{letter}</div>
          }
        )
      }
    </div>
  );
}
