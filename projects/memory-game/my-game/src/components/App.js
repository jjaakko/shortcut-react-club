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
      numberOfCards: 8,
      numberOfTurnedCards: 0
    };
    this.clickCard = this.clickCard.bind(this);
  }

  componentDidMount() {
    this.shuffle();
  }

  clickCard(id) {
    console.log("Card " + id + " clicked!");
    let cardsOnTable = this.state.cardsOnTable;
    cardsOnTable[id].visibility = "visible";
    //console.table(this.getVisibleCardIds());
    if (!this.lookingForFirstCard()) {
      console.log("2nd click");
      this.playerHasPair();
      window.setTimeout(() => {
        this.hideAllButPairs();
      }, 2000);
    }
    let numberOfTurnedCards = this.state.numberOfTurnedCards;
    this.setState({
      cardsOnTable: cardsOnTable,
      numberOfTurnedCards: ++numberOfTurnedCards
    });
  }

  hideAllButPairs() {
    let cardsOnTable = this.state.cardsOnTable;
    cardsOnTable.forEach(function(card, index) {
      // hide card if the pair of this card is not found yet
      if (!card.hasPair) card.visibility = "hidden";
    });
    this.setState({
      cardsOnTable: cardsOnTable
    });
  }

  getVisibleNoPairCardIds() {
    let visible = [];
    this.state.cardsOnTable.forEach(function(card, index) {
      if (card.visibility === "visible" && card.hasPair === false)
        visible.push(card.id);
    });
    return visible;
  }

  playerHasPair() {
    const visible = this.getVisibleNoPairCardIds();
    if (visible.length < 2) return false;
    if (
      this.state.cardsOnTable[visible[0]].suite ===
        this.state.cardsOnTable[visible[1]].suite &&
      this.state.cardsOnTable[visible[0]].rank ===
        this.state.cardsOnTable[visible[1]].rank
    ) {
      console.log("New pair found");
      let cardsOnTable = this.state.cardsOnTable;
      cardsOnTable[visible[0]].hasPair = true;
      cardsOnTable[visible[1]].hasPair = true;
      this.setState({
        cardsOnTable: cardsOnTable
      });
      return true;
    }
  }

  lookingForFirstCard() {
    if (this.state.numberOfTurnedCards % 2 === 0) {
      return true;
    }
    return false;
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
        id: i,
        suite: card.suite,
        rank: card.rank,
        visibility: "hidden",
        hasPair: false
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
            <Card
              key={card.id}
              visibility={card.visibility}
              suite={card.suite}
              rank={card.rank}
              clickCard={this.clickCard}
              id={card.id}
            />
          ))}
        </div>
      </div>
    );
  }
}
