import React, { Component } from 'react';
import randomWords from 'random-words'; // https://www.npmjs.com/package/random-words

import Header from './Header'
import LetterRow from './LetterRow';

// TODO: add keypress support
class Scores {
  constructor(sessionWinStreak = 0, wins = 0, losses = 0, attemptCount = 0, maxAttempts = 8) {
    this.sessionWinStreak = sessionWinStreak;
    this.wins = wins;
    this.losses = losses;
    this.attemptCount = attemptCount;
    this.maxAttempts = maxAttempts;
  }
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      minWordLen: 4,
      maxWordLen: 20,
      challengeWord: '',
      letterIdxsToReveal: [],
      scores: new Scores(),
      letterKeyPressed: '',
    }
  }

  handleKeyPress = e => {
    this.setState({ letterKeyPressed: e.key });
  }

  componentDidMount() {
    this.setState({ challengeWord: this.getWord() });
    document.addEventListener("keypress", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.isRoundOver()) document.getElementById("btnNewWord").focus();
  }

  getWord() {
    let word = '';
    while (word.length < this.state.minWordLen || word.length > this.state.maxWordLen)
      word = randomWords();
    return word;
  }

  isRoundWon = (state = this.state) => this.state.challengeWord !== '' && state.letterIdxsToReveal.length === this.state.challengeWord.length;
  isRoundLost = (state = this.state) => state.scores.attemptCount === state.scores.maxAttempts;
  isRoundOver = (state = this.state) => this.isRoundWon(state) || this.isRoundLost(state);

  isChoiceCorrect = (letter) => {

    const matchedIdxs = this.getMatchedIndexes(letter);
    this.processChoiceOutcome(matchedIdxs);
    return matchedIdxs.length ? true : false;
  }

  getMatchedIndexes(letter) {

    const matchedIdxs = [];

    for (let i = 0; i < this.state.challengeWord.length; i++)
      if (this.state.challengeWord[i] === letter) matchedIdxs.push(i);

    return matchedIdxs;
  }

  processChoiceOutcome(matchedIdxs) {

    this.setState(({ letterIdxsToReveal, scores, }) => {

      const newState = {
        letterIdxsToReveal: [...letterIdxsToReveal, ...matchedIdxs],
        scores: { ...scores },
      };

      if (!matchedIdxs.length) newState.scores.attemptCount++;
      if (this.isRoundWon(newState)) { newState.scores.sessionWinStreak++; newState.scores.wins++; }
      else if (this.isRoundLost(newState)) { newState.scores.losses++; newState.scores.sessionWinStreak = 0; }
      return newState;
    });
  }

  newRound = _ => {
    this.setState(prevState => {
      return {
        challengeWord: this.getWord(),
        letterIdxsToReveal: [],
        letterKeyPressed: '',
        scores: { ...prevState.scores, attemptCount: 0, }
      }
    });
  }

  render() {
    const { newRound, isChoiceCorrect, isRoundWon, isRoundLost, isRoundOver,
      state: { challengeWord, scores, letterIdxsToReveal, letterKeyPressed, },
    } = this;

    let btnNewWord;
    if (isRoundOver())
      btnNewWord =
        <button
          id="btnNewWord"
          onClick={newRound}
          type="button"
          className="btn btn-outline-light">
          New Word
      </button>

    return (
      <div className="container">
        <Header
          word={challengeWord}
          scores={scores}
          letterIdxsToReveal={letterIdxsToReveal}
          isRoundWon={isRoundWon}
          isRoundLost={isRoundLost}
        />
        <div className="container">
          <LetterRow
            isChoiceCorrect={isChoiceCorrect}
            isRoundOver={isRoundOver}
            letterKeyPressed={letterKeyPressed}
          />
        </div>
        <div className="text-center mt-3">
          {btnNewWord}
        </div>
      </div>
    );
  }
}

export default App;