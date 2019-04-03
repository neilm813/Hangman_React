import React, { Component } from 'react';
import randomWords from 'random-words'; // https://www.npmjs.com/package/random-words

import Header from './Header'
import LetterRow from './LetterRow';
import { incrementKeyBy, copyObjPath, concatKey, } from '../helpers';

// TODO: add keypress support
class Scores {
  constructor(sessionWinStreak = 0, roundCount = 0, correctCount = 0, attemptCount = 0, maxAttempts = 8) {
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
      scores: new Scores(),
      letterIdxsToReveal: [],
    }
  }

  getWord() {
    let word = '';
    while (word.length < this.state.minWordLen || word.length > this.state.maxWordLen)
      word = randomWords();
    return word;
  }

  componentDidMount() {
    this.setState({ challengeWord: this.getWord() });
  }

  isRoundWon = newCorrectCnt => this.state.scores.correctCount === this.state.challengeWord.length || this.state.challengeWord.length === newCorrectCnt;
  isRoundLost = _ => this.state.scores.attemptCount === this.state.scores.maxAttempts;
  hasRoundEnded = _ => this.isRoundWon() || this.isRoundLost();

  isChoiceCorrect = (letter) => {
    const matchedIdxs = this.getMatchedIndexes(letter);
    this.processChoiceOutcome(matchedIdxs);
    return matchedIdxs.length ? true : false;
  }

  getMatchedIndexes(letter) {
    const matchedIdxs = [];

    for (let i = 0; i < this.state.challengeWord.length; i++)
      if (this.state.challengeWord[i] === letter) matchedIdxs.push(i);

    matchedIdxs.length && this.setState(concatKey('letterIdxsToReveal', matchedIdxs));
    return matchedIdxs;
  }

  processChoiceOutcome(matchedIdxs) {

    if (matchedIdxs.length) {

      this.setState(prevState => {

        // copy and increment correctCount so we can use new correct count to make more updates with a single setState call
        const copy = copyObjPath(prevState, 'scores.correctCount', prev => prev + matchedIdxs.length);
        this.isRoundWon(copy.scores.correctCount) && copy.scores.sessionWinStreak++;
        return copy;
      })
    }
    else
      this.setState(incrementKeyBy('scores.attemptCount', 1));
  }

  newRound = _ => {

    const newState = {
      challengeWord: this.getWord(),
      letterIdxsToReveal: [],
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

  render() {
    const { hasRoundEnded, newRound, isRoundWon, isRoundLost, isChoiceCorrect,
      state: { challengeWord, scores, letterIdxsToReveal, },
    } = this;

    let newWordBtn;
    if (hasRoundEnded())
      newWordBtn = <button onClick={newRound} type="button" className="btn btn-outline-light">New Word</button>

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
          <LetterRow isChoiceCorrect={isChoiceCorrect} hasRoundEnded={hasRoundEnded} />
        </div>
        <div className="text-center mt-3">{newWordBtn}</div>
      </div>
    );
  }
}

export default App;