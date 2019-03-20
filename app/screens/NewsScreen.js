import React, { Component } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { StyleProvider, Container, Header, Left, Button, Icon, Body, Title, Content, Text, ListItem } from 'native-base';

import getTheme from 'app/native-base-theme/components';
import material from 'app/native-base-theme/variables/material';

import { HeaderStatusBarFixStyle } from 'app/screens/styles/HeaderStatusBarFixStyle';

import PostsDownloader from 'app/api/PostsDownloader';
import PostComponent from 'app/components/PostComponent';
import ReadPostsStorage from 'app/storage/ReadPostsStorage';

export default class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
    };
  }
  
  async componentDidMount() {
    this.readPostsStorage = new ReadPostsStorage();
    await this.readPostsStorage.fetchData();

    this.refresh();
  }

  async loadMorePosts() {
    if (this.state.loading) {
      return null;
    }

    this.setState({
      loading: true,
    });

    await this.postsDownloader.loadMore();

    this.setState({
      posts: this.postsDownloader.getAllLoaded(),
      loading: false,
    });
  }

  refresh() {
    this.posts = [];
    this.postsDownloader = new PostsDownloader();
    this.loadMorePosts();
  }

  async togglePostReadState(post) {
    this.readPostsStorage.togglePostRead(post);
    await this.readPostsStorage.flushData();
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
                renderItem={({item}) => <PostComponent data={item} onReadStateChange={() => this.togglePostReadState(item)} isRead={this.readPostsStorage.isPostRead(item)} />}
                keyExtractor={(item, index) => item.id.toString()}
                onEndReached={(distance) => this.loadMorePosts()}
                onEndReachedThreshold={0.5}
                onRefresh={() => this.refresh()}
                refreshing={false}
              />
              { this.state.loading && <ActivityIndicator />}
          </Container>
        </Container>
      </StyleProvider>
    );
  }
}
