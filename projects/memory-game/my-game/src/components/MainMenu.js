import React from "react";

export function MainMenu(props) {
  return (
    <div className={"modal" + props.classes}>
      <div className={"menu"}>
        <h2 className={"white"}>Main Menu</h2>

        <div className="menuItem" onClick={props.playAgain}>
          Play Again
        </div>
        <div className="menuItem">Select difficulty</div>
      </div>
    </div>
  );
}
