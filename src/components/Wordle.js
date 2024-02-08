import React from "react";
import useWordle from "../hooks/useWordle";
import { useEffect } from "react";
import Grid from "./Grid";
import Keypad from "./Keypad";
const Wordle = ({ solution }) => {
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } =
    useWordle({
      solution,
    });

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    if (isCorrect) {
      window.removeEventListener("keyup", handleKeyup);
    }
    if (turn > 5) {
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div>
      <div>solution- {solution}</div>
      <div>current guess - {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
    </div>
  );
};

export default Wordle;
