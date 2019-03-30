import React, { Component } from 'react';
import Header from './Header'
import LetterRow from './LetterRow';
import { incrementKeyBy, toggleKey, setKeyTo, } from '../helpers';
// https://www.npmjs.com/package/random-words
const randomWords = require('random-words');

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      minWordLen: 4,
      maxWordLen: 20,
      challengeWord: '',
      showNewWordBtn: false,
      scores: {
        attemptCount: 0,
        correctCount: 0,
        maxAttempts: 8,
        sessionWinStreak: 0,
      }
    }
  }

  getWord() {
    let word = '';
    while (word.length < this.state.minWordLen || word.length > this.state.maxWordLen)
      word = randomWords();
    this.setState({ challengeWord: randomWords() });
  }

  componentDidMount() {
    this.getWord();
  }

  processChoiceOutcome(matchedIdxs) {

    if (matchedIdxs.length) 
      this.setState(incrementKeyBy('scores.correctCount', 1));
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
    return (
      <div className="container">
        <Header word={this.state.challengeWord} scores={this.state.scores} />
        <div className="container">
          <LetterRow isChoiceCorrect={this.isChoiceCorrect} />
        </div>
        
      </div>
    );
  }
}

export default App;

