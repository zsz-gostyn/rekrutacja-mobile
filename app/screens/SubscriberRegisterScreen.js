import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { StyleProvider, Container, Header, Left, Button, Icon, Body, Title, Content } from 'native-base';

import getTheme from 'app/native-base-theme/components';
import material from 'app/native-base-theme/variables/material';

import { HeaderStatusBarFixStyle } from 'app/screens/styles/HeaderStatusBarFixStyle';
import SubscriberRegisterFormComponent from 'app/components/SubscriberRegisterFormComponent';
import ErrorComponent, { ErrorType } from 'app/components/errors/ErrorComponent';

export default class SubscriberRegisterScreen extends Component {
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
              <Title>Zarejestruj się</Title>
            </Body>
          </Header>
          <Content>
            <SubscriberRegisterFormComponent navigation={this.props.navigation} />
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}
