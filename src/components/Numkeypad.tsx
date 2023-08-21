import React, { useState } from 'react';

interface NumKeypadProps {
  onNumberClick: (number: string) => void;
  onDelete: () => void;
  onClearAll: () => void;
}

const NumKeypad: React.FC<NumKeypadProps> = ({
  onNumberClick,
  onDelete,
  onClearAll,
}) => {
  const handleNumberClick = (number: string) => {
    onNumberClick(number);
  };

  return (
    <div className="numeric-keypad">
      <div className="keypad-row">
        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button>
      </div>
      <div className="keypad-row">
        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>
      </div>
      <div className="keypad-row">
        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>
      </div>
      <div className="keypad-row">
        <button onClick={onDelete}>Delete</button>
        <button onClick={() => handleNumberClick('0')}>0</button>
        <button onClick={onClearAll}>Clear All</button>
      </div>
    </div>
  );
};

export default NumKeypad;
