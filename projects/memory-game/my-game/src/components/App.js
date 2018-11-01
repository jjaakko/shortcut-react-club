import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export class App extends Component {
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
					<div className={"card hearts"}> <p>A</p> </div>
					<div className={"card clubs"}> <p>A</p> </div>
					<div className={"card spades"}> <p>A</p> </div>
					<div className={"card diamonds hidden"}> <p>A</p> </div>
					<div className={"card hearts hidden"}> <p>A</p> </div>
					<div className={"card clubs hidden"}> <p>A</p> </div>
					<div className={"card spades hidden"}> <p>A</p> </div>

				</div>

			</div>
		);
	}
}