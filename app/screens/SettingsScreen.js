import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { StyleProvider, Container, Header, Left, Button, Icon, Body, Title, Content, Text } from 'native-base';

import getTheme from 'app/native-base-theme/components';
import material from 'app/native-base-theme/variables/material';

import { HeaderStatusBarFixStyle } from 'app/styles/HeaderStatusBarFixStyle';

export default class SettingsScreen extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header style={HeaderStatusBarFixStyle}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>ZSZ-Rekrutacja</Title>
            </Body>
          </Header>
          <Content>
            <Text>Ustawienia</Text>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}
