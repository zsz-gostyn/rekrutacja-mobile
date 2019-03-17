import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Icon }  from 'native-base';
import ReadStateBadge from 'app/components/ReadStateBadge';
import PropTypes from 'prop-types';

export default class PostComponent extends Component {
  constructor(props) {
    super(props);
     
    this.state = {
      expanded: false,
    };

    this.wordsInContent = this.props.data.content.split(' ');
  }
  
  fitInCompressedView() {
    return this.wordsInContent.length <= this.props.maxWordsInCompressView;
  }

  compressedView() {
    if (this.fitInCompressedView()) {
      return this.props.data.content;
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
          <ReadStateBadge read={this.read} />
        </View>
        <View style={styles.center}>
          <View style={styles.topicView}>
            <Text style={styles.topicText}>{this.props.data.topic}</Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.contentText}>{this.state.expanded ? this.props.data.content : this.compressedView()}</Text>
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
};

PostComponent.defaultProps = {
  maxWordsInCompressView: 12,
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
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
