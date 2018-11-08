import React from "react";

export function SelectDifficulty(props) {
  return (
    <div className={"modal" + props.classes}>
      <div className={"menu"}>
        <h2 className={"white"}>Select difficulty</h2>

        <div
          className={
            "menuItem" + (props.difficulty === "easy" ? " " + "chosen" : "")
          }
          onClick={props.difficultyEasy}
        >
          Easy
        </div>
        <div
          className={
            "menuItem" + (props.difficulty === "hard" ? " " + "chosen" : "")
          }
          onClick={props.difficultyHard}
        >
          Hard
        </div>
        <div className="menuItem" onClick={props.mainMenu}>
          Back to main menu
        </div>
      </div>
    </div>
  );
}
