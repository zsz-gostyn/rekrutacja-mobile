import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { StyleProvider, Container, Header, Left, Button, Icon, Body, Title, Content, Text } from 'native-base';

import getTheme from 'app/native-base-theme/components';
import material from 'app/native-base-theme/variables/material';

import { HeaderStatusBarFixStyle } from 'app/screens/styles/HeaderStatusBarFixStyle';

export default class AppInfoScreen extends Component {
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
              <Title>Informacje o aplikacji</Title>
            </Body>
          </Header>
          <Content style={styles.container}>
            <View style={styles.item}>
              <Text style={styles.content}>Informacje o aplikacji</Text>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  content: {
    fontSize: 16
  },
  item: {
    marginBottom: 20,
  },
});
