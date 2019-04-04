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

  letterClick = _ => {

    const { hasRoundEnded, isChoiceCorrect, content, } = this.props;

    if (hasRoundEnded() || this.state.clicked) return;

    this.setState(toggleKey('clicked'));

    const isCorrect = isChoiceCorrect(content.toLowerCase());

    if (isCorrect)
      this.setState(concatKey('classList', 'text-success'));
    else
      this.setState(concatKey('classList', 'text-danger'));
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.hasRoundEnded() && prevState.clicked) {
      return {
        classList: ['selectable-letter'],
        clicked: false,
      };
    }
    else return null;
  }

  render() {
    const { letterClick, state: { classList, }, } = this;
    return (
      <span 
        className={classList.join(" ")} 
        onClick={letterClick} 
      >
        {this.props.content}
      </span>
    )
  }
}