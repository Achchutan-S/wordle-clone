import React from "react";
import useWordle from "../hooks/useWordle";
import { useEffect } from "react";
const Wordle = ({ solution }) => {
  const { currentGuess, handleKeyup } = useWordle({ solution });

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);
  return (
    <div>
      <div>current guess - {currentGuess}</div>
    </div>
  );
};

export default Wordle;
