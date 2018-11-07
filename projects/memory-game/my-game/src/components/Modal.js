import React from "react";

export function Modal(props) {
  return (
    <div className={"modal" + props.classes}>
      <div className={"menu"}>
        <h2 className={"white"}>Congrats !</h2>

        <div className="menuItem" onClick={props.playAgain}>
          Play Again
        </div>
        <div className="menuItem"> Main Menu </div>
      </div>
    </div>
  );
}
