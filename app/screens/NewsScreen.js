import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { StyleProvider, Container, Header, Left, Button, Icon, Body, Title, Content, Text, ListItem } from 'native-base';

import getTheme from 'app/native-base-theme/components';
import material from 'app/native-base-theme/variables/material';

import { HeaderStatusBarFixStyle } from 'app/screens/styles/HeaderStatusBarFixStyle';

import PostsDownloader from 'app/api/PostsDownloader';
import CustomScrollComponent from 'app/components/CustomScrollComponent';

export default class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };

    this.postsDownloader = new PostsDownloader();
    this.loadMorePosts();
  }
  
  loadMorePosts() {
    this.postsDownloader.loadMore()
      .then(() => {
        if (true || !this.postsDownloader.isLoading()) {
          this.setState({
            posts: this.postsDownloader.getAllLoaded(),
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  refresh() {
    this.postsDownloader = new PostsDownloader();
    this.loadMorePosts();
  }

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
              <Title>Aktualności</Title>
            </Body>
          </Header>
          <Container>
              <FlatList
                data={this.state.posts}
                renderItem={({item}) => <ListItem style={{paddingTop: 100, paddingBottom: 100}}><Text>{item.topic}</Text></ListItem>}
                keyExtractor={(item, index) => item.id.toString()}
                onEndReached={(distance) => this.loadMorePosts()}
                onEndReachedThreshold={0.5}
                onRefresh={() => this.refresh()}
                refreshing={false}
              />
          </Container>
        </Container>
      </StyleProvider>
    );
  }
}
