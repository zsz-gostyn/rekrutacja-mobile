import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import getTheme from 'app/native-base-theme/components';
import material from 'app/native-base-theme/variables/material';

import { HeaderStatusBarFixStyle } from 'app/screens/styles/HeaderStatusBarFixStyle';

export default class StorageErrorComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.title}>Błąd pamięci</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.content}>Wystąpił błąd pamięci programu. Skontaktuj się z autorem aplikacji.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
  },
  item: {
    marginBottom: 20,
  }
});
