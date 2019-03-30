import React, { Component } from 'react';
import Header from './Header'
import LetterRow from './LetterRow';
import { incrementKeyBy, toggleKey, incrementKeyByProp } from '../helpers';

const randomWords = require('random-words');

// on mount fetch word
// https://www.npmjs.com/package/random-words

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      challengeWord: '',
      scores: {
        attemptCount: 0,
        correctCount: 0,
      }
    }
  }

  componentDidMount() {
    this.setState({ challengeWord: randomWords(), })
  }

  processChoiceOutcome(matchedIdxs) {

    if (matchedIdxs.length) 
      this.setState(incrementKeyBy('scores.correctCount', 1), _=> console.log(this.state));
    else 
      this.setState(incrementKeyBy('scores.attemptCount', 1), _=> console.log(this.state));
  }

  getMatchedIndexes(letter) {

    const matchedIdxs = [];

    for (let i = 0; i < this.state.challengeWord.length; i++) {
      
      if (this.state.challengeWord[i] === letter)
        matchedIdxs.push(i);
    }
    return matchedIdxs;
  }

  isChoiceCorrect = (letter) => {
    this.setState(toggleKey('scores.test'));
    const matchedIdxs = this.getMatchedIndexes(letter);
    this.processChoiceOutcome(matchedIdxs);
    return matchedIdxs.length ? true : false;
  }


  render() {
    return (
      <div className="container">
        <Header word={this.state.challengeWord} />
        <div className="container">
          <LetterRow isChoiceCorrect={this.isChoiceCorrect} />
        </div>
      </div>
    );
  }
}

// const App = () => (
//     <Header />
// );

export default App;

