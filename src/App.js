import React, { useEffect, useState } from "react";
import "./App.css";
import Wordle from "./components/Wordle";
const App = () => {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/solutions")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        // console.log(json);
        //random number between 0 and 49
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word);
      });
  }, [setSolution]);
  return (
    <div className="App">
      <h1>Wordle </h1>
      {solution && <Wordle solution={solution} />}
    </div>
  );
};

export default App;
