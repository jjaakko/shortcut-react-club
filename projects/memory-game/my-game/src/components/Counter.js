import React from "react";

export function Counter(props) {
  return (
    <div className={"counter" + " " + (props.count > 0 ? "visible" : "hidden")}>
      You have turned <span className="counter-number">{props.count}</span>
      card{props.count > 1 ? "s" : ""}.
    </div>
  );
}
