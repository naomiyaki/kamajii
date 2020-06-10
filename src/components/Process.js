import React, { PureComponent } from 'react';

export default class Process extends PureComponent {
  constructor() {
    super();
    this.state = {
      counter: 0
    }
  }

  incrementCounter(offset) {
    this.setState({
      counter: this.state.counter + offset
    });
  }

  render() {
    return(
      <div className="process">
        {'Hi! This is a React Component ⚛️'}
        <div className="counter">
          {this.state.counter}
          <button onClick={() => { this.incrementCounter(1) }}>
            {'+ 1'}
          </button>
          <button onClick={() => { this.incrementCounter(-1) }}>
            {'- 1'}
          </button>
        </div>
      </div>
    );
  }
}
