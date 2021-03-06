import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { StyleProvider, Container, Header, Left, Button, Icon, Body, Title, Content, Text, ListItem } from 'native-base';

import getTheme from 'app/native-base-theme/components';
import material from 'app/native-base-theme/variables/material';

import { HeaderStatusBarFixStyle } from 'app/screens/styles/HeaderStatusBarFixStyle';

import PostsDownloader from 'app/api/PostsDownloader';
import PostComponent from 'app/components/PostComponent';
import ReadPostsStorage from 'app/storage/ReadPostsStorage';

import ErrorComponent, { ErrorType } from 'app/components/errors/ErrorComponent';

export default class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      error: ErrorType.NONE,
    };
  }
  
  async componentDidMount() {
    this.setState({ posts: [] });
    this.postsDownloader = new PostsDownloader();
    this.loadMorePosts();

    try {
      this.readPostsStorage = new ReadPostsStorage();
      await this.readPostsStorage.fetchData();
    } catch (error) {
      this.setState({
        error: ErrorType.STORAGE,
      });
    }

  }

  loadMorePosts() {
    if (this.state.loading) {
      return null;
    }

    this.setState({ loading: true }, async () => {
      try {
        await this.postsDownloader.loadMore(10 );
      } catch (error) {
        this.setState({ error: ErrorType.NETWORKING });
      }

      this.setState({
        posts: this.postsDownloader.getAllLoaded(),
        loading: false,
      });
    });
  }

  async togglePostReadState(post) {
    this.readPostsStorage.togglePostRead(post);

    try {
      await this.readPostsStorage.flushData();
    } catch (error) {
      this.setState({
        error: ErrorType.NETWORKING,
      });
    }
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
          <View>
            {(() => {
              if (this.state.error != ErrorType.NONE) {
                return (<ErrorComponent type={this.state.error} />);
              }
              
              return (
                <FlatList
                  data={this.state.posts}
                  renderItem={({item}) => <PostComponent data={item} onReadStateChange={() => this.togglePostReadState(item)} isRead={this.readPostsStorage.isPostRead(item)} />}
                  keyExtractor={(item, index) => item.id.toString()}
                  onEndReached={(distance) => this.loadMorePosts()}
                  onEndReachedThreshold={0.5}
                  onRefresh={() => this.componentDidMount()}
                  refreshing={false}
                  listFooterComponent={this.state.loading && <ActivityIndicator />}
                />
              );

            })()}
          </View>
        </Container>
      </StyleProvider>
    );
  }
}
