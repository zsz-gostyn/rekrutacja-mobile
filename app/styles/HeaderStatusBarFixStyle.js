import { StyleSheet, StatusBar } from 'react-native';

const style = StyleSheet.create({
  headerStatusBar: {
    paddingTop: StatusBar.currentHeight,
    height: 50 + StatusBar.currentHeight,
  }
});

export const HeaderStatusBarFixStyle = style.headerStatusBar;
