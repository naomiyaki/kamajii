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

  testClassPropertyMethod = (event) => {
    console.log(this.state, event);
  }

  render() {
    return(
      <div className="process-sample">
        {'Hi! This is a React Component ⚛️'}
        <div className="counter">
          <h3 className="counter">
            {`Counter: ${this.state.counter}`}
          </h3>
          <button onClick={() => { this.incrementCounter(1) }}>
            {'+ 1'}
          </button>
          <button onClick={() => { this.incrementCounter(-1) }}>
            {'- 1'}
          </button>
        </div>
        <p className="property-link">
          <a href="#" onClick={this.testClassPropertyMethod}>
            {'Class Property Methods'}
          </a>{' work too.'}
        </p>
      </div>
    );
  }
}
