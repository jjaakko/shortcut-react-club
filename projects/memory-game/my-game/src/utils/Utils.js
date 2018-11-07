/**
 * Returns pseudorandom number
 * @param  {int} max [description]
 * @return {int}     0 <= the returned value < max
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const suites = ["diamonds", "hearts", "clubs", "spades"];
export const ranks = [
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

export class Deck {
  constructor() {
    let i = 0;
    let deckOfCards = [];
    for (let suite = 0; suite < 4; suite++) {
      for (let rank = 0; rank < 13; rank++) {
        deckOfCards[i] = {
          suite: suites[suite],
          rank: ranks[rank]
        };
        i++;
      }
    }
    this.deck = deckOfCards;
  }

  getDeck() {
    return this.deck;
  }

  getRandomCard() {
    // pick random card from the deck
    let randomIndex = getRandomInt(this.deck.length);
    let card = this.deck[randomIndex];

    // remove card so that the same card can't be picked again

    // the line below would change card as well
    // this.deck[randomIndex].something = 5;
    // so how come it be that when the orignal object is removed, the card still has its value?
    this.deck.splice(randomIndex, 1);
    return card;
  }

  static areTwoCardsSame(card1, card2) {
    if (card1.suite === card2.suite && card1.rank === card2.rank) {
      return true;
    }
    return false;
  }
}
