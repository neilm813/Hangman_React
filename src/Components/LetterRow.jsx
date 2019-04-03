import React, { Component } from 'react';
import { nElems, } from '../helpers';

import SelectableLetter from './SelectableLetter';

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

  buildRows({ isChoiceCorrect, hasRoundEnded, }) {
    const rows = [];
    const lettersCopy = [...letters];
    rows.push(
      nElems(this.rowCount(), i => (
        <div key={i} className="row">
          <p className="center-block">
            {
              // on the last row that has fewer letters, splice returns the remaining letters only
              lettersCopy.splice(0, this.state.maxLettersPerRow).map(letter => (
                <SelectableLetter key={letter} content={letter} isChoiceCorrect={isChoiceCorrect} hasRoundEnded={hasRoundEnded} />
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
          {this.buildRows(this.props)}
        </div>
      </div>
    )
  }
}