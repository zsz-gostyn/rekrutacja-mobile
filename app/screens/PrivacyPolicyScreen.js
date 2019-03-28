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
              <Title>Polityka prywatności</Title>
            </Body>
          </Header>
          <Content style={styles.container}>
            <View style={styles.item}>
              <Text style={styles.content}>
                Zgodnie z art. 13 ust. 1 i ust. 2 Ogólnego Rozporządzenia o Ochronie Danych z dnia 27 kwietnia 2016 r. (dalej RODO) informujemy, że:
              </Text>
              <Text style={styles.content}>
                1. Administratorem Państwa danych osobowych jest Zespół Szkół Zawodowych w Gostyniu z siedzibą przy ul. Tuwima 44, 63-800 Gostyń e-mail: sekretariat@zsz-gostyn.com.pl
              </Text>
              <Text style={styles.content}>
                2. W sprawach związanych z danymi osobowymi można skontaktować się z Inspektorem Ochrony Danych pod adresem e-mail: iod@powiat.gostyn.pl,
                Adres do korespondencji: Starostwo Powiatowe w Gostyniu, ul. Wrocławska 256, 63-800 Gostyń.
              </Text>
              <Text style={styles.content}>
                3. Dane osobowe przetwarzane będą na podstawie art. 6 ust. 1 lit.a RODO (zgoda) w celu przesłania informacji o rekrutacji oraz kontaktu w jej sprawie.
              </Text>
              <Text style={styles.content}>
                4. Dostęp do danych osobowych posiadają upoważnieni pracownicy Zespołu Szkół Zawodowych w Gostyniu, podmioty upoważnione do odbioru danych na podstawie przepisów prawa oraz podmioty, z którymi podpisano umowę powierzenia przetwarzania danych osobowych.
              </Text>
              <Text style={styles.content}>
                5. Dane osobowe nie będą przekazywane do państwa trzeciego lub organizacji mię-dzynarodowej.
              </Text>
              <Text style={styles.content}>
                6. Dane osobowe będą przechowywane przez okres jednego roku.
              </Text>
              <Text style={styles.content}>
                7. W związku z przetwarzaniem przez Administratora danych osobowych przysługuje Państwu prawo: dostępu do treści swoich danych oraz ich sprostowania, usunięcia lub ograniczenia przetwarzania, a także prawo sprzeciwu, zażądania zaprzestania przetwarzania i przenoszenia danych.
                (Realizacja powyższych praw musi być zgodna z przepisami prawa, na podstawie których odbywa się przetwarzanie danych oraz RODO, a także m.in. z zasadami archiwizacji).
              </Text>
              <Text style={styles.content}>
                8. Mają Państwo prawo wniesienia skargi do organu nadzorczego, tj. Prezesa Urzędu Ochrony Danych Osobowych.
              </Text>
              <Text style={styles.content}>
                9. Państwa dane nie będą poddawane zautomatyzowanemu podejmowania decyzji, w tym również profilowaniu.
              </Text>
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
