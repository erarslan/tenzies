import { useState, useEffect } from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [tenzies, setTenzies] = useState(false);
  const [dices, setDices] = useState(allNewDice());

  useEffect(() => {
    const allSame = dices.every((dice) => dice.value === dices[0].value);

    const allHeld = dices.every((dice) => dice.isHeld);

    if (allSame && allHeld) {
      setTenzies(true);
    }
  }, [dices]);

  function allNewDice() {
    const array = [];

    for (let i = 0; i < 10; i++) {
      array.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }

    return array;
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDices(allNewDice());
    } else {
      setDices((prevDices) =>
        prevDices.map((dice) =>
          dice.isHeld
            ? dice
            : { ...dice, value: Math.floor(Math.random() * 6) + 1 }
        )
      );
    }
  }

  function holdDice(id) {
    setDices((prevDices) =>
      prevDices.map((dice) => {
        if (dice.id === id) {
          return { ...dice, isHeld: !dice.isHeld };
        } else {
          return dice;
        }
      })
    );
  }

  const diceElements = dices.map((dice) => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  return (
    <main className="box">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">{diceElements}</div>
      <button className="roll-button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      {tenzies && <Confetti />}
    </main>
  );
}
