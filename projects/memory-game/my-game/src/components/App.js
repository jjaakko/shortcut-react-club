import React, { Component } from "react";
import { getRandomInt, Deck } from "../utils/Utils.js";
import { Card } from "./Card.js";
import { PlayerWins } from "./PlayerWins.js";
import { MainMenu } from "./MainMenu.js";
import { SelectDifficulty } from "./SelectDifficulty.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsOnTable: [],
      numberOfPairs: 4,
      numberOfTurnedCards: 0,
      disableClicking: false,
      modalPlayerWins: false,
      modalMainMenu: true,
      modalSelectDifficulty: false,
      difficulty: "easy",
      timeWhileVisible: 1500
    };
    this.clickCard = this.clickCard.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.mainMenu = this.mainMenu.bind(this);
    this.selectDifficulty = this.selectDifficulty.bind(this);
    this.difficultyEasy = this.difficultyEasy.bind(this);
    this.difficultyHard = this.difficultyHard.bind(this);
  }

  componentDidMount() {
    this.shuffle();
  }

  /**
   * Setup new game
   */
  playAgain() {
    this.shuffle();
    this.setState({
      modalPlayerWins: false,
      modalMainMenu: false,
      modalSelectDifficulty: false
    });
  }

  mainMenu() {
    this.setState({
      modalPlayerWins: false,
      modalMainMenu: true,
      modalSelectDifficulty: false
    });
  }

  selectDifficulty() {
    this.setState({
      modalPlayerWins: false,
      modalMainMenu: false,
      modalSelectDifficulty: true
    });
  }

  difficultyEasy() {
    this.setState({
      difficulty: "easy",
      numberOfPairs: 4,
      timeWhileVisible: 1500
    });
  }

  difficultyHard() {
    this.setState({
      difficulty: "hard",
      numberOfPairs: 8,
      timeWhileVisible: 500
    });
  }

  /**
   * Handle card click
   * @param id An id of the card clicked
   */
  clickCard(id) {
    console.log("Card " + id + " clicked!");
    // let cardsOnTable = this.state.cardsOnTable;
    // This leads cardsOnTable to reference this.state.cardsOnTable
    // changing cardsOnTable would lead to changing the actual state
    // without using setState...
    // Instead, let's make a deep copy
    let cardsOnTable = JSON.parse(JSON.stringify(this.state.cardsOnTable));
    let disableClicking = false;

    // turn the card
    cardsOnTable[id].visibility = true;
    // add number of turned cards
    const numberOfTurnedCards = this.state.numberOfTurnedCards + 1;
    if (this.lookingForSecondCard(numberOfTurnedCards)) {
      let pair = this.playerHasPair(cardsOnTable);
      // why pair == true evaluates to false even if pair is not an empty array
      if (Array.isArray(pair) == true) {
        cardsOnTable[pair[0]].hasPair = true;
        cardsOnTable[pair[1]].hasPair = true;
        // check if player has found all pairs
        if (this.playerWins(cardsOnTable)) {
          // show Congratulations modal after a small delay
          window.setTimeout(() => {
            this.setState({
              modalPlayerWins: true
            });
          }, 400);
        }
      } else {
        // set timeout only if player did not find a pair
        window.setTimeout(() => {
          let cardsOnTable = JSON.parse(
            JSON.stringify(this.state.cardsOnTable)
          );
          cardsOnTable = this.hideAllButPairs(cardsOnTable);
          this.setState({
            cardsOnTable: cardsOnTable,
            disableClicking: false
          });
        }, this.state.timeWhileVisible);
        // prevent clicking cards during the timeout
        disableClicking = true;
      }
    }
    this.setState({
      cardsOnTable: cardsOnTable,
      numberOfTurnedCards: numberOfTurnedCards,
      disableClicking: disableClicking
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component updated");
  }

  /**
   * Hide all cards except pairs.
   * Call this function when player has clicked two cards
   * but have not found pairs.
   * @param [array] cards An array of card objects
   * @return [array] An array of card object where all cards except pairs are hidden
   */
  hideAllButPairs(cards) {
    cards.forEach(function(card, index) {
      // hide card if the pair of this card is not found yet
      if (!card.hasPair) card.visibility = false;
    });
    return cards;
  }

  /**
   * Get all cards player has just turned visible. Exclude previously found pairs.
   * @param [array] cards An array of card objects
   * @return [array] An array of ids of visible cards exlcuding previously found pairs.
   */
  getVisibleNoPairCardIds(cards) {
    let visible = [];
    cards.forEach(function(card, index) {
      if (card.visibility === true && card.hasPair === false)
        visible.push(card.id);
    });
    return visible;
  }

  /**
   * Checks if player has just picked up a pair.
   * @param [array] cards An array of card objects
   * @return [array/boolean] An array of ids of newly found pair or boolean false.
   */
  playerHasPair(cards) {
    const visible = this.getVisibleNoPairCardIds(cards);
    if (visible.length < 2) return false;
    if (Deck.areTwoCardsSame(cards[visible[0]], cards[visible[1]])) {
      console.log("New pair found");
      return visible;
    }
    return false;
  }

  /**
   * Check if player has picked up the second card on this turn.
   * @param  [int] numberOfTurnedCards the number of card player has turned visible so far
   * @return [boolean]
   */
  lookingForSecondCard(numberOfTurnedCards) {
    if (numberOfTurnedCards % 2 === 0) {
      return true;
    }
    return false;
  }

  /**
   * Check if player has found all pairs
   * @param [array] cards An array of card objects
   * @return [boolean]
   */
  playerWins(cards) {
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].hasPair === false) return false;
    }
    return true;
  }

  /**
   * Shuffle the deck for a new game
   */
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
          <PlayerWins
            classes={this.state.modalPlayerWins === true ? " open" : ""}
            playAgain={this.playAgain}
            mainMenu={this.mainMenu}
          />
          <MainMenu
            classes={this.state.modalMainMenu === true ? " open" : ""}
            playAgain={this.playAgain}
            selectDifficulty={this.selectDifficulty}
          />
          <SelectDifficulty
            classes={this.state.modalSelectDifficulty === true ? " open" : ""}
            difficulty={this.state.difficulty}
            difficultyEasy={this.difficultyEasy}
            difficultyHard={this.difficultyHard}
            mainMenu={this.mainMenu}
          />

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
