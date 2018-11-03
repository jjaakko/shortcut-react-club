import React from "react";

export function Card(props) {
  return (
    <div
      className={"card " + props.suite + " " + props.visibility}
      onClick={() => props.clickCard(props.id)}
    >
      {" "}
      <p>{props.rank}</p>
    </div>
  );
}
