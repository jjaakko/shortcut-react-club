import React, {Component} from 'react';

export function Card(props) {
  return (
    <div className={"card " + props.suite}> <p>{props.rank}</p></div>
  );
}