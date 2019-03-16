import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { StyleProvider, Container, Header, Left, Button, Icon, Body, Title, Content, Text } from 'native-base';

import getTheme from 'app/native-base-theme/components';
import material from 'app/native-base-theme/variables/material';

import { HeaderStatusBarFixStyle } from 'app/screens/styles/HeaderStatusBarFixStyle';

export default class HelpScreen extends Component {
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
              <Title>Pomoc</Title>
            </Body>
          </Header>
          <Content style={{padding: 10}}>
            <Text>
              Witamy! Dziękujemy za zainstalowanie naszej aplikacji. Dzięki niej będziesz doskonale poinformowany o przebiegu procesu rekrutacyjnego w naszej szkole.
            </Text>
            <Text>
              Na stronie głównej znajduje się lista wszystkich aktualności. Będziesz mógł oznaczać poszczególne z nich jako przeczytane lub nieprzeczytane.
            </Text>
            <Text>
              Na stronie <Text style={{ fontStyle: 'italic' }}>Zarejestruj się</Text> znajduje się formularz, który pozwoli Ci zapisać się na listę subskrybentów.
              Dzięki temu, będziesz mógł otrzymywać powiadomienia także poprzez e-mail.
            </Text>
            <Text>
              Na stronie <Text style={{ fontStyle: 'italic' }}>Informacje o aplikacji</Text> znajdują się informacje o tej aplikacji.
            </Text>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}
