import React, { Component } from "react";
import { nElems, } from "../helpers";

class Header extends Component {


	render() {
		const { isRoundWon, isRoundLost, letterIdxsToReveal, word, scores } = this.props;
		let letterClasses = "challenge-word-chars";

		if (isRoundWon()) letterClasses += ' text-success';
		else if (isRoundLost()) letterClasses += ' text-danger';

		return (
			<div id="stats-wrap" className="container text-center">
				<div className='rounded border border-top-0 border-secondary d-inline-block px-3'>
					<h1><u>Hangman</u></h1>
					<h2 id="remaining-attempts" className='my-3'>
						Attempts: {scores.attemptCount} / {scores.maxAttempts}
					</h2>
					<h2>Session Win Streak: {scores.sessionWinStreak}</h2>
				</div>
				<div id="challenge-word-wrap">
					<div id="challenge-word-letters-wrap">
						{
							nElems(word.length, i => (
								<span
									key={i}
									className={letterClasses}>{letterIdxsToReveal.includes(i) || isRoundLost() ? word[i] : '\u00A0' /* &nbsp; */}
								</span>
							))
						}
					</div>
					<div id="challenge-word-underscores-wrap">
						{
							nElems(word.length, i => (
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