import React from 'react';
import { AsyncStorage } from 'react-native';

export default class ReadPostsStorage {
  constructor() {
    this.allPosts = [];
  }

  setPostRead(post) {
    const specificPost = this.getPostInformations(post);

    if (specificPost) {
      specificPost.updates_count = post.updates_count; // specificPost is a reference to specific allPosts element
    } else {
      this.allPosts.push({
        id: post.id,
        updates_count: post.updates_count,
      });
    }
  }

  setPostUnread(post) {
    const specificPost = this.getPostInformations(post);

    this.allPosts.splice(this.allPosts.indexOf(specificPost), 1);
  }
 
  togglePostRead(post) {
    if (this.isPostRead(post)) {
      this.setPostUnread(post);
    } else {
      this.setPostRead(post);
    }
  }

  isPostRead(post) {
    const specificPost = this.getPostInformations(post);
    return typeof specificPost !== 'undefined' && specificPost.updates_count === post.updates_count;
  }

  getPostInformations(post) {
    return this.allPosts.find((element, index, array) => {
      if (element.id === post.id) {
        return element;
      }
    });
  }

  async fetchData() {
    try {
      let allPosts = await AsyncStorage.getItem('ReadPostsStorage');

      if (allPosts) {
        this.allPosts = JSON.parse(allPosts);
      } else {
        this.allPosts = [];
      }
    } catch (error) {
      console.error('Błąd w kodzie fetchData()', error);
    }
  }

  async flushData() {
    try {
      await AsyncStorage.setItem('ReadPostsStorage', JSON.stringify(this.allPosts));
    } catch (error) {
      console.error('Błąd w kodzie flushData()');
    }
  }
}
