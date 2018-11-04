import React, { Component } from "react";
import { getRandomInt, Deck } from "../utils/Utils.js";
import { Card } from "./Card.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsOnTable: [],
      numberOfPairs: 4,
      numberOfTurnedCards: 0,
      disableClicking: false
    };
    this.clickCard = this.clickCard.bind(this);
  }

  componentDidMount() {
    this.shuffle();
  }

  clickCard(id) {
    console.log("Card " + id + " clicked!");
    // NNO!! This leads cardsOnTable to reference this.state.cardsOnTable
    // changing cardsOnTable would lead to changing the actual state
    // without using setState...
    // let cardsOnTable = this.state.cardsOnTable;

    // Instead, let's make a deep copy
    let cardsOnTable = JSON.parse(JSON.stringify(this.state.cardsOnTable));

    cardsOnTable[id].visibility = true;

    this.setState({
      cardsOnTable: cardsOnTable,
      numberOfTurnedCards: this.state.numberOfTurnedCards + 1
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("k" + this.state.numberOfTurnedCards);
    // to prevent infinite loop, we must check for a pair ONLY
    // if the event causing the call of componentDidUpdate is player clicking a card
    // instead of the game just updating the state (for example hiding the cards)
    // see https://reactjs.org/docs/react-component.html#componentdidupdate
    if (
      this.state.numberOfTurnedCards !== prevState.numberOfTurnedCards &&
      this.lookingForSecondCard()
    ) {
      console.log("2nd click");
      if (!this.playerHasPair()) {
        // set timeout only if player did not find a pair
        window.setTimeout(() => {
          this.hideAllButPairs();
          this.setState({
            disableClicking: false
          });
        }, 1500);
        this.setState({
          disableClicking: true
        });
      }
    }
  }

  hideAllButPairs() {
    let cardsOnTable = JSON.parse(JSON.stringify(this.state.cardsOnTable));

    cardsOnTable.forEach(function(card, index) {
      // hide card if the pair of this card is not found yet
      if (!card.hasPair) card.visibility = false;
    });
    this.setState({
      cardsOnTable: cardsOnTable
    });
  }

  getVisibleNoPairCardIds() {
    let visible = [];
    this.state.cardsOnTable.forEach(function(card, index) {
      if (card.visibility === true && card.hasPair === false)
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
      let cardsOnTable = JSON.parse(JSON.stringify(this.state.cardsOnTable));
      cardsOnTable[visible[0]].hasPair = true;
      cardsOnTable[visible[1]].hasPair = true;
      this.setState({
        cardsOnTable: cardsOnTable
      });
      return true;
    }
    return false;
  }

  lookingForSecondCard() {
    if (this.state.numberOfTurnedCards % 2 === 0) {
      return true;
    }
    return false;
  }

  shuffle() {
    let pairs = [];
    let cardsInRandomOrder = [];
    let deckObj = new Deck();
    //let deck = deckObj.getDeck();
    // pick numberOfPairs cards from the Deck
    for (let i = 0; i < this.state.numberOfPairs; i++) {
      pairs[i] = deckObj.getRandomCard();
    }

    // every pair contains 2 cards, let's put all individual
    // cards into an array
    const cards = pairs.concat(pairs);
    // we have now all of our individual cards but the order is not random
    // let's make a array where all the cards are in random order and add more
    // properties to each card
    for (let i = 0; i < this.state.numberOfPairs * 2; i++) {
      let randomIndex = getRandomInt(cards.length);
      let card = cards[randomIndex];
      cardsInRandomOrder[i] = {
        id: i,
        suite: card.suite,
        rank: card.rank,
        visibility: false,
        hasPair: false
      };
      cards.splice(randomIndex, 1);
    }
    console.table(cardsInRandomOrder);
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
              disableClicking={this.state.disableClicking}
            />
          ))}
        </div>
      </div>
    );
  }
}
