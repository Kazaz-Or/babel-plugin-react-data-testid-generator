import React, { Component } from 'react';

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div style={{
        padding: '20px',
        border: '2px solid #667eea',
        borderRadius: '8px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
      }}>
        <h4>Class Component</h4>
        <p>Testing plugin with class-based components</p>
        <div style={{ margin: '15px 0' }}>
          <strong>Count: {this.state.count}</strong>
        </div>
        <button
          onClick={this.increment}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          Increment
        </button>
      </div>
    );
  }
}

export default ClassComponent; 