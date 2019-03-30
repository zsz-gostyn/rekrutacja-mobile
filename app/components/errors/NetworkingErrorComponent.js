import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import getTheme from 'app/native-base-theme/components';
import material from 'app/native-base-theme/variables/material';

import { HeaderStatusBarFixStyle } from 'app/screens/styles/HeaderStatusBarFixStyle';

export default class NetworkingErrorComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.title}>Błąd sieci</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.content}>Wystąpił błąd sieci. Upewnij się, czy na pewno masz dostęp do Internetu.</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.content}>Jeżeli tak, spróbuj wyłączyć aplikację i włączyć ją jeszcze raz. Jeżeli nie przyniesie to zamierzonego skutku, skontaktuj się z administratorem</Text>
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
