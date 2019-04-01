import React, { Component } from 'react'
import { concatKey, toggleKey, copyObjPath, } from '../helpers';

export default class SelectableLetter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classList: ['selectable-letter'],
      clicked: false,
    }
  }

  letterClick = _ => {

    if (this.props.hasRoundEnded() || this.state.clicked) return;

    this.setState(toggleKey('clicked'));

    const isCorrect = this.props.isChoiceCorrect(this.props.content.toLowerCase());

    if (isCorrect)
      this.setState(concatKey('classList', 'text-success'));
    else
      this.setState(concatKey('classList', 'text-danger'));
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.someValue!==prevState.someValue){
      return { someState: nextProps.someValue};
   }
   else return null;
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
    return (
      <span className={this.state.classList.join(" ")} onClick={this.letterClick}>
        {this.props.content}
      </span>
    )
  }
}