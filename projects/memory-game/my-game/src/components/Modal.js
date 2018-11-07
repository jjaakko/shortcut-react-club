import React from "react";

export function Modal(props) {
  return (
    <div className={"modal" + props.classes}>
      <div className={"menu"}>
        <h2 className={"white"}>{props.title}</h2>
        {props.menuItems.map(menuItem => {
          return (
            <div className="menuItem" onClick={menuItem.callback}>
              {menuItem.title}
            </div>
          );
        })}
        <div className="menuItem" onClick={props.playAgain}>
          Play Again
        </div>
        <div className="menuItem"> Main Menu </div>
      </div>
    </div>
  );
}
