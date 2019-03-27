import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Icon }  from 'native-base';
import ReadStateBadge from 'app/components/ReadStateBadge';
import PropTypes from 'prop-types';

export default class PostComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      isRead: this.props.isRead,
    };

    this.post = this.props.data;
    this.wordsInContent = this.post.content.split(' ');
  }

  fitInCompressedView() {
    return this.wordsInContent.length <= this.props.maxWordsInCompressView;
  }

  compressedView() {
    if (this.fitInCompressedView()) {
      return this.post.content;
    }

    return this.wordsInContent
      .slice(0, this.props.maxWordsInCompressView)
      .join(' ')
      .replace(/[^\w\s]$/, '') + '...';
  }

  render() {
    return (
      <View style={styles.listItem}>
        <View style={styles.left}>
          <Button transparent onPress={() => {this.props.onReadStateChange(); this.setState({ isRead: !this.state.isRead });}}>
            <ReadStateBadge read={this.state.isRead} />
          </Button>
        </View>
        <View style={styles.center}>
          <View style={styles.topicView}>
            <Text style={styles.topicText}>{this.post.topic}</Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.contentText}>{this.state.expanded ? this.post.content : this.compressedView()}</Text>
          </View>
        </View>
        <View style={styles.right}>
          { !this.fitInCompressedView() &&
            <Button transparent onPress={() => {
              this.setState({
                expanded: !this.state.expanded,
              });
            }}>
              <Icon name="arrow-dropdown" />
            </Button>
          }
        </View>
      </View>
    );
  }
}

PostComponent.propTypes = {
  maxWordsInCompressView: PropTypes.number.isRequired,
  isRead: PropTypes.bool.isRequired
};

PostComponent.defaultProps = {
  maxWordsInCompressView: 12,
  isRead: false
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    paddingVertical: 10,
  },
  left: {
    flex: 1,
    justifyContent: 'center',
  },
  center: {
    flex: 4,
    flexDirection: 'column',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  topicView: {
    alignSelf: 'stretch',
  },
  topicText: {
    fontSize: 16,
    fontWeight: "400",
  },
  contentView: {
    alignSelf: 'stretch',
  },
  contentText: {
    color: '#777777',
  },

});
