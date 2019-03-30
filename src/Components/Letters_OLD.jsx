import React, { Component } from 'react'

export default class Letters extends Component {
  constructor(props) {
    super(props);
    this.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  }
  render() {     
    return (
      <div className="container row-and-col-wrap">
        <div id="selectable-letters-wrap">         
          <div className="row">
            <p className="center-block">
              <span className="selectable-letter">A</span>
              <span className="selectable-letter">B</span>
              <span className="selectable-letter">C</span>
              <span className="selectable-letter">D</span>
              <span className="selectable-letter">E</span>
              <span className="selectable-letter">F</span>
            </p>
          </div>
          <div className="row">
            <p className="center-block">
              <span className="selectable-letter">G</span>
              <span className="selectable-letter">H</span>
              <span className="selectable-letter">I</span>
              <span className="selectable-letter">J</span>
              <span className="selectable-letter">K</span>
              <span className="selectable-letter">L</span>
            </p>
          </div>
          <div className="row">
            <p className="center-block">
              <span className="selectable-letter">M</span>
              <span className="selectable-letter">N</span>
              <span className="selectable-letter">O</span>
              <span className="selectable-letter">P</span>
              <span className="selectable-letter">Q</span>
              <span className="selectable-letter">R</span>
            </p>
          </div>
          <div className="row">
            <p className="center-block">
              <span className="selectable-letter">S</span>
              <span className="selectable-letter">T</span>
              <span className="selectable-letter">U</span>
              <span className="selectable-letter">V</span>
              <span className="selectable-letter">W</span>
              <span className="selectable-letter">X</span>
            </p>
          </div>
          <div className="row">
            <p className="center-block">
              <span className="selectable-letter">Y</span>
              <span className="selectable-letter">Z</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}