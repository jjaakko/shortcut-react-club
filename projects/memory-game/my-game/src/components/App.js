import React, { Component } from "react";
import { Card } from "./Card.js";

/**
 * Returns pseudorandom number
 * @param  {int} max [description]
 * @return {int}     0 <= the returned value < max
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const suites = ["diamonds", "hearts", "clubs", "spades"];
const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsOnTable: [],
      numberOfCards: 8
    };
  }

  componentDidMount() {
    this.shuffle();
  }

  shuffle() {
    let i;
    let halfOfRandomCards = [];
    let cardsInRandomOrder = [];
    for (i = 0; i < this.state.numberOfCards / 2; i++) {
      // choose suite randomly
      const suite = getRandomInt(4);
      // choose card name randomly
      const rank = getRandomInt(13);
      halfOfRandomCards[i] = {
        suite: suites[suite],
        rank: ranks[rank]
      };
    }
    const randomCards = halfOfRandomCards.concat(halfOfRandomCards);
    // we have now all of our cards but the order is not randomly
    // let's fix that
    for (i = 0; i < this.state.numberOfCards; i++) {
      let randomIndex = getRandomInt(randomCards.length);
      let card = randomCards[randomIndex];
      cardsInRandomOrder[i] = {
        suite: card.suite,
        rank: card.rank,
        id: i
      };
      console.table(randomCards);
      randomCards.splice(randomIndex, 1);
    }
    //console.log(randomCards);
    console.log(cardsInRandomOrder);
    this.setState({
      cardsOnTable: cardsInRandomOrder
    });
  }

  render() {
    return (
      <div className="MemoryApp">
        <div className={"game"}>
          <div className={"modal"}>
            <div className={"menu"}>
              <h2 className={"white"}>Congrats !</h2>

              <div className="menuItem"> Play Again </div>
              <div className="menuItem"> Main Menu </div>
            </div>
          </div>

          {this.state.cardsOnTable.map((card, index) => (
            <Card key={card.id} suite={card.suite} rank={card.rank} />
          ))}
        </div>
      </div>
    );
  }
}
