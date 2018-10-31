import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import exercises from "exercices";
import solutions from "solutions";

import Exercice from "lib/components/Exercice";
import { NavPages, Pages } from "lib/components/Pages";

export class App extends Component {
	render() {
		return (
			<Router>
				<div className="app">
					<section className="navSection">
						<NavPages />

						<h2>Exercices</h2>
						<nav>
							<ul>
								{Object.keys(exercises).map(name => (
									<li key={name}>
										<Link to={`/${name}`}>{name}</Link>
									</li>
								))}
							</ul>
						</nav>

						<h2>Solutions</h2>
						<nav>
							<ul>
								{Object.keys(solutions).map(name => (
									<li key={name}>
										<Link to={`/solutions/${name}`}>
											{name}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</section>

					<main className="main">
						<div className="container">
							<Pages />

							{Object.entries(exercises).map(([name, mod]) => (
								<Route
									key={name}
									path={`/${name}`}
									render={props => (
										<Exercice
											{...props}
											name={name}
											mod={mod}
										/>
									)}
								/>
							))}

							{Object.entries(solutions).map(([name, mod]) => (
								<Route
									key={name}
									path={`/solutions/${name}`}
									render={props => (
										<Exercice
											{...props}
											name={name}
											mod={mod}
										/>
									)}
								/>
							))}
						</div>
					</main>
				</div>
			</Router>
		);
	}
}

export default App;
