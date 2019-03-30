import React, { Component } from 'react'
import { concatKey, setKeyTo, } from '../helpers';

export default class SelectableLetter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: ['selectable-letter'],
      clicked: false,
    }
  }
  letterClick = _=> {

    if (this.state.clicked) return;
    
    this.setState(setKeyTo('clicked', true));

    const isCorrect = this.props.isChoiceCorrect(this.props.content.toLowerCase());

    if (isCorrect) 
      this.setState(concatKey('classList', 'text-success'));
    else 
      this.setState(concatKey('classList', 'text-danger'));

    
  }
  render() {
    return (
      <span className={this.state.classList.join(" ")} onClick={e => this.letterClick(e)}>
        {this.props.content}
      </span>
    )
  }
}
