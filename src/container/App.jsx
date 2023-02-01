import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useStopwatch } from "react-timer-hook";
import Die from "../components/Die";
import "./App.css";

function App() {
  const [dice, setDice] = useState(allNewDice(initialDie));
  const [isFinished, setIsFinished] = useState(false);
  const [rollsNumb, setRollsNumb] = useState(0);
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  // --> Return new Object with Initital Data
  function newDie() {
    return {
      id: nanoid(),
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
    };
  }

  function initialDie() {
    return {
      id: nanoid(),
      value: 0,
      isHeld: false,
    };
  }

  function allNewDice(funParam) {
    const randomNumbersArray = Array(10) // array size is 10
      .fill()
      .map(() => funParam());
    return randomNumbersArray;
  }

  function rollDice() {
    setDice((prevDice) => prevDice.map((die) => (die.isHeld ? die : newDie())));
    setRollsNumb((prevNumb) => prevNumb + 1);
    !isRunning && start();
  }

  function handleDiceClick(id) {
    // console.log(id);
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      handleDiceClick={handleDiceClick}
    />
  ));

  function resetAll() {
    setDice(allNewDice(initialDie));
    setIsFinished(false);
    setRollsNumb(0);
    reset(0, false);
  }
  useEffect(() => {
    const allIsHeld = dice.every((die) => die.isHeld);
    const initVal = dice[0].value;
    const hasSameValues = dice.every((die) => die.value === initVal);
    allIsHeld && hasSameValues ? setIsFinished(true) : setIsFinished(false);
  }, [dice]);
  useEffect(() => {
    pause();
  }, [isFinished]);
  return (
    <main>
      <section className="game--section">
        {isFinished && (
          <Confetti
            width={window.innerWidth - 10}
            height={window.innerHeight - 10}
          />
        )}
        <div className="game--container">
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <h4 className="game--h4">To Start Click ROLL</h4>
          <div className="dice--container">{diceElements}</div>
          <div className="btn--container">
            <button onClick={isFinished ? resetAll : rollDice}>
              {isFinished ? "New Game" : "ROLL"}
            </button>
            <button onClick={resetAll}>RESET</button>
          </div>
        </div>
      </section>
      <section className="result--section">
        <div className="result--container">
          <h4>Rolls Number : {rollsNumb}</h4>
          <h4>
            Time : {minutes}m {seconds}s
          </h4>
        </div>
      </section>
    </main>
  );
}

export default App;
