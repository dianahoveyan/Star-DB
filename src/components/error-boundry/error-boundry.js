import React, { Component } from 'react';

import ErrorIndicator from '../error-indicator/error-indicator';

export default class ErrorBoundry extends Component {

  state = {
    hasError: false
  };

  componentDidCatch(err) {
    console.log(err, 'ttttttt');
    this.setState({
      hasError: true
    });
  }
  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return this.props.children;
  }
}
