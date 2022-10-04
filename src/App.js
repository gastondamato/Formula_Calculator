// TODO
// activate keydown
// Gamification
// add rotation and word detection
// create point system depending of word and formula dificulty

import { useState } from "react";
import "./styles.css";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [formula, setFormula] = useState("0");
  const panel = [
    { id: "clear", value: "AC", operator: true },
    { id: "divide", value: "/", operator: true },
    { id: "multiply", value: "*", operator: true },
    { id: "seven", value: "7", operator: false },
    { id: "eight", value: "8", operator: false },
    { id: "nine", value: "9", operator: false },
    { id: "subtract", value: "-", operator: true },
    { id: "four", value: "4", operator: false },
    { id: "five", value: "5", operator: false },
    { id: "six", value: "6", operator: false },
    { id: "add", value: "+", operator: true },
    { id: "one", value: "1", operator: false },
    { id: "two", value: "2", operator: false },
    { id: "three", value: "3", operator: false },
    { id: "zero", value: "0", operator: false },
    { id: "decimal", value: ".", operator: false },
    { id: "equals", value: "=", operator: true }
  ];
  const isOperator = /[-+*/]/;

  function setNumber(event) {
    console.log(event.target.value);
    if (formula === "0") {
      setFormula(event.target.value);
      setDisplay(event.target.value);
    } else {
      setFormula((oldFormula) => oldFormula + event.target.value);
      if (display !== "0")
        setDisplay((oldFormula) => oldFormula + event.target.value);
      else setDisplay(event.target.value);
    }
  }

  function parseMath() {
    setDisplay(Function(`'use strict'; return (${formula})`)());
  }

  function resetCalc() {
    setFormula("0");
    setDisplay("0");
  }

  function setOperator(event) {
    if (event.target.id === "clear") {
      resetCalc();
    } else if (event.target.id === "equals") {
      parseMath();
    } else {
      if (isOperator.test(formula[formula.length - 1])) {
        // operator already in place... replace it
        setFormula((oldFormula) => {
          return (
            oldFormula.substring(0, oldFormula.length - 1) + event.target.value
          );
        });
      } else if (formula[0] === "0") {
        console.log("it is 0");
        if (event.target.id === "subtract") {
          setFormula("-");
          setDisplay("-");
        }
      } else {
        console.log("else", formula[formula.length - 1]);
        setFormula((oldFormula) => oldFormula + event.target.value);
        setDisplay("0");
      }
    }
  }

  function getPanel() {
    const keyPanel = panel.map((oldKey) => {
      return (
        <button
          key={oldKey.id}
          id={oldKey.id}
          value={oldKey.value}
          className={oldKey.operator ? "operator" : "normal"}
          onClick={
            oldKey.operator
              ? (event) => setOperator(event)
              : (event) => setNumber(event)
          }
        >
          {oldKey.value}
        </button>
      );
    });

    return keyPanel;
  }

  return (
    <div className="App">
      <h1>Formula Calculator</h1>
      <div className="calc">
        <div className="formula">{formula}</div>
        <div className="display" id="display">
          {display}
        </div>
        <div className="panel">{getPanel()}</div>
      </div>
    </div>
  );
}
