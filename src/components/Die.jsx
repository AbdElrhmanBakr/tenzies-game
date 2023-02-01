import React from "react";

export default function Die({ id, value, isHeld, handleDiceClick }) {
  return (
    <div>
      <div
        onClick={() => handleDiceClick(id)}
        className={isHeld ? "die selected" : "die"}
      >
        {value}
      </div>
    </div>
  );
}
