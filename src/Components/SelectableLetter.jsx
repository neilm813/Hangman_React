import React, { Component } from 'react'
import { concatKey, toggleKey, } from '../helpers';

export default class SelectableLetter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classList: ['selectable-letter'],
      clicked: false,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.isRoundOver() && prevState.clicked) {
      return {
        classList: ['selectable-letter'],
        clicked: false,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    
    const { letterKeyPressed } = this.props;
    if (prevState.clicked) return;

    if (letterKeyPressed !== prevProps.letterKeyPressed && letterKeyPressed)
      this.letterChosen(null, letterKeyPressed);
  }

  letterChosen = (e, letterKeyPressed) => {

    const { letter, isRoundOver, isChoiceCorrect, } = this.props;

    if (isRoundOver() || this.state.clicked) return;

    this.setState(toggleKey('clicked'));

    const isCorrect = isChoiceCorrect(letterKeyPressed || letter.toLowerCase());

    if (isCorrect)
      this.setState(concatKey('classList', 'text-success'));
    else
      this.setState(concatKey('classList', 'text-danger'));
  }

  render() {
    const { letterChosen, state: { classList, }, } = this;
    return (
      <span
        className={classList.join(" ")}
        onClick={letterChosen}
      >
        {this.props.letter}
      </span>
    )
  }
}