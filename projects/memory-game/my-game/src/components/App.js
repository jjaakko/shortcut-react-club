import React, {Component} from 'react';
import ReactDOM from 'react-dom';

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
    this.shuffle();
  }
  
  shuffle() {
    var i;
    for (i=0;i<=this.state.numberOfCards;i++) {
      // choose suite randomly
      const suite = getRandomInt(4);
      // choose card name randomly
      const rank = getRandomInt(13);
      this.state.cardsOnTable[i] = {
        suite: suites[suite],
        rank: ranks[rank]
      };
      console.log(this.state.cardsOnTable[i]);
    }
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

					<div className={"card diamonds"}> <p>A</p> </div>
					<div className={"card hearts"}> <p>K</p> </div>
					<div className={"card clubs"}> <p>J</p> </div>
					<div className={"card spades"}> <p>Q</p> </div>
					<div className={"card diamonds hidden"}> <p>10</p> </div>
					<div className={"card hearts hidden"}> <p>9</p> </div>
					<div className={"card clubs hidden"}> <p>A</p> </div>
					<div className={"card spades hidden"}> <p>A</p> </div>

				</div>

			</div>
		);
	}
}