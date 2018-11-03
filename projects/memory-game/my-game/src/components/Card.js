import React from "react";

export function Card(props) {
  return (
    <div
      className={
        "card " + props.suite + " " + (props.visibility ? "visible" : "hidden")
      }
      onClick={
        props.visibility || props.disableClicking
          ? undefined
          : () => props.clickCard(props.id)
      }
    >
      {" "}
      <p>{props.rank}</p>
    </div>
  );
}
