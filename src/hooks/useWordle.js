import { useState } from "react";

const useWordle = ({ solution }) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); //each guess is an array
  const [history, setHistory] = useState([]); //each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); //letter:colour

  //format a guess into an array of letter objects
  //e.g. [{key:'a',color:'yellow'}]
  const formatGuess = () => {
    console.log("Formatting the guess....,", currentGuess);
    let solutionArray = [...solution];
    //console.log(solution);
    //console.log(solutionArray);

    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });
    // console.log(formattedGuess);
    //find any green letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });
    //find yellow colours
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prev) => {
      let newKeys = { ...prev };
      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key];

        if (l.color === "green") {
          newKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          newKeys[l.key] = "yellow";
          return;
        }
        if (l.color === "grey" && currentColor !== ("green" || "yellow")) {
          newKeys[l.key] = "grey";
          return;
        }
      });

      return newKeys;
    });
    setCurrentGuess("");
  };

  //handle  keyip event & tack current guess
  //if user presses enter, add , the new guess
  const handleKeyup = ({ key }) => {
    //regex to check for string

    if (key === "Enter") {
      //only add guess if turn is less than 5
      if (turn > 5) {
        console.log("You used up all your chances !");
        return;
      }
      //do not allow duplicates
      if (history.includes(currentGuess)) {
        console.log("You already tried that word");
        return;
      }
      //check 5 chars length
      if (currentGuess.length !== 5) {
        console.log("Enter sufficient letters");
        return;
      }
      console.log("Enter key clicked fail safe condition");
      const formatted = formatGuess();
      console.log(formatted);
      addNewGuess(formatted);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys };
};

export default useWordle;
