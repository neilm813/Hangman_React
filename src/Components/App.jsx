import React, { Component } from 'react';
import Header from './Header'
import LetterRow from './LetterRow';
import { incrementKeyBy, copyObjPath, } from '../helpers';
const randomWords = require('random-words'); // https://www.npmjs.com/package/random-words

class Scores {
  constructor(sessionWinStreak = 0, roundCount = 0, correctCount  = 0, attemptCount = 0, maxAttempts = 8) {
    this.sessionWinStreak = sessionWinStreak;
    this.roundCount = roundCount;
    this.correctCount = correctCount;
    this.attemptCount = attemptCount;
    this.maxAttempts = maxAttempts;
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      minWordLen: 4,
      maxWordLen: 20,
      challengeWord: '',
      scores: new Scores()
    }
  }

  componentDidMount() {
    this.setState({ challengeWord: this.getWord() });
  }

  isRoundWon = correctCnt => this.state.scores.correctCount === this.state.challengeWord.length || this.state.challengeWord.length === correctCnt;
  hasRoundEnded = _ => this.isRoundWon() || /* round lost */ this.state.scores.attemptCount === this.state.scores.maxAttempts;

  getWord() {
    let word = '';
    while (word.length < this.state.minWordLen || word.length > this.state.maxWordLen)
      word = randomWords();
    return word;
  }

  newRound = _ => {

    const newState = {
      challengeWord: this.getWord(),
    };

    if (this.isRoundWon()) {

      this.setState(prevState => {
        newState.scores = new Scores(prevState.scores.sessionWinStreak, prevState.scores.roundCount + 1);
        return newState;
      });
    }
    else {
      newState.scores = new Scores(); 
      this.setState(newState);
    } 
  }

  processChoiceOutcome(matchedIdxs) {

    if (matchedIdxs.length) {

      this.setState(prevState => {

        const copy = copyObjPath(prevState, 'scores.correctCount', prev => prev + matchedIdxs.length);
        this.isRoundWon(copy.scores.correctCount) && copy.scores.sessionWinStreak++;
        return copy;
      })
    }
    else
      this.setState(incrementKeyBy('scores.attemptCount', 1));
  }

  getMatchedIndexes(letter) {
    const matchedIdxs = [];

    for (let i = 0; i < this.state.challengeWord.length; i++)
      if (this.state.challengeWord[i] === letter) matchedIdxs.push(i);
    return matchedIdxs;
  }

  isChoiceCorrect = (letter) => {
    const matchedIdxs = this.getMatchedIndexes(letter);
    this.processChoiceOutcome(matchedIdxs);
    return matchedIdxs.length ? true : false;
  }

  render() {

    let newWordBtn;
    if (this.hasRoundEnded())
      newWordBtn = <button onClick={this.newRound} type="button" className="btn btn-outline-light">New Word</button>

    return (
      <div className="container">
        <Header word={this.state.challengeWord} scores={this.state.scores} />
        <div className="container">
          <LetterRow isChoiceCorrect={this.isChoiceCorrect} hasRoundEnded={this.hasRoundEnded} />
        </div>
        <div className="text-center mt-3">{newWordBtn}</div>
      </div>
    );
  }
}

export default App;