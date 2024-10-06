import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  // State variables
  const [currentInput, setCurrentInput] = useState('0');
  const [previousInput, setPreviousInput] = useState('');
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [savedNumber, setSavedNumber] = useState(null);
  const [previousCalculation, setPreviousCalculation] = useState('');

  // Function to round results
  const roundResult = (number) => {
    return parseFloat(number.toFixed(10));
  };

  // Function to update the input number
  const inputNumber = (number) => {
    if (waitingForSecondOperand) {
      setCurrentInput(number);
      setWaitingForSecondOperand(false);
    } else {
      setCurrentInput(currentInput === '0' ? number : currentInput + number);
    }
  };

  // Function to input a decimal point
  const inputDecimal = (dot) => {
    if (waitingForSecondOperand) {
      setCurrentInput('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!currentInput.includes(dot)) {
      setCurrentInput(currentInput + dot);
    }
  };

  // Function to handle operators
  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (previousInput === '') {
      setPreviousInput(inputValue);
    } else if (operator) {
      let result = performCalculation[operator](previousInput, inputValue);
      result = roundResult(result);
      setCurrentInput(String(result));
      setPreviousInput(result);
    } else {
      setPreviousInput(inputValue);
    }

    setOperator(nextOperator);
    setWaitingForSecondOperand(true);
  };

  // Object to map operators to calculation functions
  const performCalculation = {
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  };

  // Function to calculate the result
  const calculate = () => {
    const inputValue = parseFloat(currentInput);

    if (operator && !waitingForSecondOperand) {
      let result = performCalculation[operator](previousInput, inputValue);
      result = roundResult(result);

      setPreviousCalculation(`${previousInput} ${operator} ${inputValue} =`);
      setCurrentInput(String(result));
      setPreviousInput('');
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  // Function to reset the calculator
  const resetCalculator = () => {
    setCurrentInput('0');
    setPreviousInput('');
    setOperator(null);
    setWaitingForSecondOperand(false);
    setPreviousCalculation('');
    setSavedNumber(null);
  };

  // Function to handle backspace
  const backspace = () => {
    if (currentInput.length > 1) {
      setCurrentInput(currentInput.slice(0, -1));
    } else {
      setCurrentInput('0');
    }
  };

  // Function to handle percentage calculations
  const inputPercent = () => {
    const value = parseFloat(currentInput);
    const result = value / 100;
    setCurrentInput(String(roundResult(result)));
  };

  // Function to save and recall numbers
  const saveNumber = () => {
    if (savedNumber === null) {
      // Save the current number
      setSavedNumber(parseFloat(currentInput));
      setPreviousCalculation(`Saved: ${currentInput}`);
    } else {
      // Recall the saved number
      if (waitingForSecondOperand) {
        setPreviousInput(savedNumber);
        setWaitingForSecondOperand(false);
      } else {
        setCurrentInput(String(savedNumber));
      }
      setPreviousCalculation(`Recalled: ${savedNumber}`);
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-previous">{previousCalculation}</div>
      <input
        type="text"
        className="calculator-screen"
        value={currentInput}
        disabled
      />

      <div className="calculator-keys">
        {/* First row: AC, %, /, backspace */}
        <button
          type="button"
          className="all-clear"
          onClick={() => resetCalculator()}
        >
          AC
        </button>
        <button type="button" onClick={() => inputPercent()}>
          %
        </button>
        <button
          type="button"
          className="operator"
          onClick={() => handleOperator('/')}
        >
          ÷
        </button>
        <button
          type="button"
          className="backspace"
          onClick={() => backspace()}
        >
          ⌫
        </button>

        {/* Second row: 7, 8, 9, * */}
        <button type="button" onClick={() => inputNumber('7')}>
          7
        </button>
        <button type="button" onClick={() => inputNumber('8')}>
          8
        </button>
        <button type="button" onClick={() => inputNumber('9')}>
          9
        </button>
        <button
          type="button"
          className="operator"
          onClick={() => handleOperator('*')}
        >
          ×
        </button>

        {/* Third row: 4, 5, 6, - */}
        <button type="button" onClick={() => inputNumber('4')}>
          4
        </button>
        <button type="button" onClick={() => inputNumber('5')}>
          5
        </button>
        <button type="button" onClick={() => inputNumber('6')}>
          6
        </button>
        <button
          type="button"
          className="operator"
          onClick={() => handleOperator('-')}
        >
          −
        </button>

        {/* Fourth row: 1, 2, 3, + */}
        <button type="button" onClick={() => inputNumber('1')}>
          1
        </button>
        <button type="button" onClick={() => inputNumber('2')}>
          2
        </button>
        <button type="button" onClick={() => inputNumber('3')}>
          3
        </button>
        <button
          type="button"
          className="operator"
          onClick={() => handleOperator('+')}
        >
          +
        </button>

        {/* Fifth row: 0, decimal point, Save, = */}
        <button type="button" onClick={() => inputNumber('0')}>
          0
        </button>
        <button type="button" className="decimal" onClick={() => inputDecimal('.')}>
          .
        </button>
        <button type="button" className="save" onClick={() => saveNumber()}>
          Save
        </button>
        <button
          type="button"
          className="equal-sign operator"
          onClick={() => calculate()}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;