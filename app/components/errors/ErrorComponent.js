import React, { Component } from 'react';
import { View, Text } from 'react-native';

import NetworkingErrorComponent from 'app/components/errors/NetworkingErrorComponent';
import StorageErrorComponent from 'app/components/errors/StorageErrorComponent';
import UnknownErrorComponent from 'app/components/errors/UnknownErrorComponent';

export const ErrorType = Object.freeze({
  NONE: Symbol('none'),
  NETWORKING: Symbol('networking'),
  STORAGE: Symbol('storage'),
});

export default class ErrorComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
    };
  }

  render() {
    switch (this.state.type) {
      case ErrorType.NONE:
        return (<View></View>);

      case ErrorType.NETWORKING:
        return (<NetworkingErrorComponent />);

      case ErrorType.STORAGE:
        return (<StorageErrorComponent />);

      default:
        return (<UnknownErrorComponent />);
    }
  }
}

