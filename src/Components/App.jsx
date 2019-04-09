import React, { Component } from 'react';
import randomWords from 'random-words'; // https://www.npmjs.com/package/random-words

import Header from './Header'
import LetterRow from './LetterRow';
import { incrementKeyBy, concatKey, } from '../helpers';

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
      isRoundWon() { return this.challengeWord !== '' && this.letterIdxsToReveal.length === this.challengeWord.length; },
      isRoundLost() { return this.scores.attemptCount === this.scores.maxAttempts; },
      hasRoundEnded() { return this.isRoundWon() || this.isRoundLost(); },
    }
  }

  static getDerivedStateFromProps(props, prevState) {

    let hasEnded = prevState.hasRoundEnded();
    let isWon = prevState.isRoundWon();
    if (hasEnded === false) return null;
    const scores = { ...prevState.scores };

    if (isWon) {
      scores.wins += 1;
      scores.sessionWinStreak += 1;
    } else scores.losses += 1;

    return { scores: scores, }
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

  getWord() {
    let word = '';
    while (word.length < this.state.minWordLen || word.length > this.state.maxWordLen)
      word = randomWords();
    return word;
  }

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

    if (matchedIdxs.length)
      this.setState(concatKey('letterIdxsToReveal', matchedIdxs));
    else
      this.setState(incrementKeyBy('scores.attemptCount', 1));
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
    const { newRound, isChoiceCorrect,
      state: { isRoundWon, isRoundLost, hasRoundEnded, challengeWord, scores, letterIdxsToReveal, letterKeyPressed, },
    } = this;

    let btnNewWord;
    if (hasRoundEnded.bind(this.state).call())
      btnNewWord =
        <button
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
          isRoundWon={isRoundWon.bind(this.state)}
          isRoundLost={isRoundLost.bind(this.state)}
        />
        <div className="container">
          <LetterRow
            isChoiceCorrect={isChoiceCorrect}
            hasRoundEnded={hasRoundEnded.bind(this.state)}
            letterKeyPressed={letterKeyPressed}
          />
        </div>
        <div className="text-center mt-3">{btnNewWord}</div>
      </div>
    );
  }
}

export default App;