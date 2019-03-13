import React from 'react';
import { ScrollView, Text, View, Image, StatusBar, StyleSheet } from 'react-native';
import { StyleProvider, Container } from 'native-base';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';

import getTheme from 'app/native-base-theme/components';
import material from 'app/native-base-theme/variables/material';

import HomeScreen from 'app/screens/HomeScreen';
import SettingsScreen from 'app/screens/SettingsScreen';


const CustomDrawerComponent = (props) => (
  <StyleProvider style={getTheme(material)}>
    <ScrollView>
      <Container>
        <View style={styles.menuHeader}>
          <Text style={styles.bigTitle}>ZSZ-Rekrutacja</Text>
          <Image source={require('assets/logo.png')} style={styles.logo} />
          <Text style={styles.smallTitle}>Menu główne</Text>
        </View>
        <DrawerItems {...props} />
      </Container>
    </ScrollView>
  </StyleProvider>
);

const styles = StyleSheet.create({
  menuHeader: {
    padding: 20,
    paddingTop: 20 + StatusBar.currentHeight,
    backgroundColor: '#3F51B5',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  bigTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  smallTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export const AppDrawerNavigator = createDrawerNavigator({
  home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Strona domowa',
    },
  },
  settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Panel ustawień',
    },
  },
}, {
  contentComponent: CustomDrawerComponent,
});
