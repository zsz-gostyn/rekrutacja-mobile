import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

export default class ReadStateBadge extends Component {
  render() {
    return (
      <Icon name="book" style={this.props.read ? styles.read : styles.unread} />
    );
  }
}

ReadStateBadge.propTypes = {
  read: PropTypes.bool,
};

ReadStateBadge.defaultProps = {
  read: false,
};

const styles = StyleSheet.create({
  read: {
    color: 'green',
  },
  unread: {
    color: 'red',
  }
});
