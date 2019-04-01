import React, { Component } from 'react';
import SelectableLetter from './SelectableLetter';
import { nElems, } from '../helpers';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export default class LetterRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxLettersPerRow: 6 // resize flexibility
    }
  }

  rowCount() {
    return Math.ceil(letters.length / this.state.maxLettersPerRow);
  }

  buildRows() {
    const rows = [];
    const lettersCopy = [...letters];
    rows.push(
      nElems(this.rowCount(), i => (
        <div key={i} className="row">
        <p className="center-block">
          {
            // on the last row that has fewer letters, splice returns the remaining letters only
            lettersCopy.splice(0, this.state.maxLettersPerRow).map(letter => (
              <SelectableLetter key={letter} content={letter} isChoiceCorrect={this.props.isChoiceCorrect} hasRoundEnded={this.props.hasRoundEnded} />
            ))
          }
        </p>
      </div>
      ))
    );
    return rows;
  }

  render() {

    return (
      <div className="container row-and-col-wrap">
        <div id="selectable-letters-wrap">
          {this.buildRows()}
        </div>
      </div>
    )
  }
}