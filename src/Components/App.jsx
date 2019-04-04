import React, { Component } from 'react';
import randomWords from 'random-words'; // https://www.npmjs.com/package/random-words

import Header from './Header'
import LetterRow from './LetterRow';
import { incrementKeyBy, copyObjPath, concatKey, } from '../helpers';

// TODO: add keypress support
class Scores {
  constructor(sessionWinStreak = 0, roundCount = 1, attemptCount = 0, maxAttempts = 8) {
    this.sessionWinStreak = sessionWinStreak;
    this.roundCount = roundCount;
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
      scores: new Scores(),
      letterIdxsToReveal: [],
      isRoundWon() { return this.challengeWord !== '' && this.letterIdxsToReveal.length === this.challengeWord.length; },
      isRoundLost() { return this.scores.attemptCount === this.scores.maxAttempts; },
      hasRoundEnded() { return this.isRoundWon() || this.isRoundLost(); }
    }
  }

  componentDidMount() { this.setState({ challengeWord: this.getWord() }); }

  static getDerivedStateFromProps(props, prevState) {

    return prevState.isRoundWon()
      ? copyObjPath(prevState, 'scores.sessionWinStreak', prev => prev + 1)
      : null;
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

    const newState = {
      challengeWord: this.getWord(),
      letterIdxsToReveal: [],
    };

    this.setState(prevState => {
      
      if (this.state.isRoundWon())
        newState.scores = new Scores(prevState.scores.sessionWinStreak, prevState.scores.roundCount + 1);
      else
        newState.scores = new Scores(0, prevState.scores.roundCount + 1);
      return newState;
    });
  }

  render() {
    const { newRound, isChoiceCorrect,
      state: { isRoundWon, isRoundLost, hasRoundEnded, challengeWord, scores, letterIdxsToReveal, },
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
          <LetterRow isChoiceCorrect={isChoiceCorrect} hasRoundEnded={hasRoundEnded.bind(this.state)} />
        </div>
        <div className="text-center mt-3">{btnNewWord}</div>
      </div>
    );
  }
}

export default App;