import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';

export default class HyperlinkComponent extends PureComponent {
  render() {
    return (
      <Text
        style={styles.hyperlink}
        onPress={this.props.onPress}
      >
        {this.props.content}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  hyperlink: {
    color: '#365df9',
    textDecorationLine: 'underline',
  }
});
