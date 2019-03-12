import React from 'react';
import { ScrollView } from 'react-native';
import { StyleProvider, Container, Header, Title } from 'native-base';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';

import getTheme from 'app/native-base-theme/components';
import material from 'app/native-base-theme/variables/material';

import HomeScreen from 'app/screens/HomeScreen';
import SettingsScreen from 'app/screens/SettingsScreen';

import { HeaderStatusBarFixStyle } from 'app/styles/HeaderStatusBarFixStyle';


const CustomDrawerComponent = (props) => (
  <StyleProvider style={ getTheme(material) }>
    <ScrollView>
      <Container>
        <Header style={ HeaderStatusBarFixStyle }>
          <Title>ZSZ-Rekrutacja</Title>
        </Header>
        <DrawerItems { ...props } />
      </Container>
    </ScrollView>
  </StyleProvider>
);

export const AppDrawerNavigator = createDrawerNavigator({
  home: { screen: HomeScreen },
  settings: { screen: SettingsScreen },
}, {
  contentComponent: CustomDrawerComponent,
});
