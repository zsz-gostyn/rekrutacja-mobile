import React, { Component } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { StyleProvider, Container, Header, Left, Button, Icon, Body, Title, Content, Text } from 'native-base';

import getTheme from 'app/native-base-theme/components';
import material from 'app/native-base-theme/variables/material';

import { HeaderStatusBarFixStyle } from 'app/screens/styles/HeaderStatusBarFixStyle';
import HyperlinkComponent from 'app/components/HyperlinkComponent';

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
            <Text style={styles.content}>
              Aplikacja informuje o przebiegu rekrutacji w ZSZ w Gostyniu.
            </Text>
            <Text style={styles.content}>
              Po włączeniu aplikacji ukazuje się lista aktualności. W przypadku gdy treść danej wiadomości jest zbyt długa, jest ona domyślnie zwinięta. Można ją wtedy rozwinąć klikając przycisk.
            </Text>
            <Text style={styles.content}>
              Wiadomości są domyślnie oznaczone jako nieprzeczytane. Użytkownik może zmienić stan danej wiadomości na przeczytany klikając na ikonę koperty.
              Ustawienie to zostanie zachowane, chyba że administrator zaktualizuje daną wiadomość.
              Wtedy zostanie ona ponownie oznaczona jako nieprzeczytana, aby ewentualne dodane informacje nie umknęły uwadze użytkownika.
            </Text>
            <Text style={styles.content}>
              Aby odświeżyć listę wiadomości, wystarczy udać się na samą górę listy i pociągnąć palcem w dół.
            </Text>
            <Text style={styles.content}>
              W aplikacji znajduje się również formularz rejestracyjny subskrybenta. Warto z niego skorzystać.
              Każdy subskrybent będzie otrzymywał powiadomienia o nowych wiadomościach drogą mailową. Dzięki temu nie przegapi żadnej istotnej wiadomości.
            </Text>
            <Text style={styles.content}>
              Życzymy miłego korzystania z aplikacji!
              Zespół Szkół Zawodowych im. Powstańców Wielkopolskich w Gostyniu
            </Text>

            <Text style={styles.content}>
              Autorem tej aplikacji mobilnej jest <HyperlinkComponent content="Eryk Andrzejewski" onPress={() => Linking.openURL('https://github.com/qwercik')} />
            </Text>
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
    fontSize: 16,
    marginBottom: 20,
  },
});
