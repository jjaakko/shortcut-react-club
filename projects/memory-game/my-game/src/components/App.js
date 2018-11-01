import React, {Component} from 'react';
import {Card} from './Card.js';

function getRandomInt(max) {
  return Math.floor(Math.random()*max);
}

const suites = ['diamonds', 'hearts', 'clubs', 'spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

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
    var i;
    let halfOfRandomCards = [];
    for (i=0;i<this.state.numberOfCards/2;i++) {
      // choose suite randomly
      const suite = getRandomInt(4);
      // choose card name randomly
      const rank = getRandomInt(13);
      halfOfRandomCards[i] = {
        suite: suites[suite],
        rank: ranks[rank],
      };
    }
    const randomCards = halfOfRandomCards.concat(halfOfRandomCards);
    console.log(randomCards);
    this.setState({
      cardsOnTable: randomCards
    });
  }
  
  render() {
		return (
			<div className="MemoryApp">

				<div className={"game"}>
					<div className={"modal"}>
						<div className={"menu"}>
							<h2 className={"white"} >Congrats !</h2>

							<div className="menuItem"> Play Again </div>
							<div className="menuItem"> Main Menu </div>

						</div>
					</div>

          {this.state.cardsOnTable.map((card, index) => (
            <Card suite={card.suite} rank={card.rank} />
          ))}

				</div>

			</div>
		);
	}
}