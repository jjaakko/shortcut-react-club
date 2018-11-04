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
  static getDeck() {
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
    console.table(deckOfCards);
    return deckOfCards;
  }
}
