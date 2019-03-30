import React, { Component } from "react";
import { incrementKeyBy, nElems } from "../helpers";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attemptCount: 0,
			maxAttempts: 8,
			sessionWinStreak: 0
		};
	}

	// initUnderscoreElems() {
	// 	const els = [];

	// 	for (let letter of this.props.word) {
	// 		els.push(
	// 			<span className="challenge-word-chars">_</span>
	// 		)
	// 	}
	// 	return els;
	// }

	render() {
		return (
			<div id="stats-wrap" className="container text-center">
				<div className='rounded border border-top-0 border-secondary d-inline-block px-3'>
					<h1><u>Hangman</u></h1>
					<h2 id="remaining-attempts" className='my-3'>
						Attempts: {this.state.attemptCount} / {this.state.maxAttempts}
					</h2>
					<h2>Session Win Streak: {this.state.sessionWinStreak}</h2>
				</div>
				<div id="challenge-word-wrap">
					<div id="challenge-word-letters-wrap">
						{
							nElems(this.props.word.length, i => (
								<span key={i} className="challenge-word-chars">{this.props.word[i]}</span>
							))
						}
					</div>
					<div id="challenge-word-underscores-wrap">
						{
							nElems(this.props.word.length, i => (
								<span key={i} className="challenge-word-chars">_</span>
							))
						}
					</div>
				</div>
			</div>
		);
	}
}
export default Header;