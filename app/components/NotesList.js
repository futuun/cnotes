import React, { Component } from 'react'
import { Platform, Keyboard } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { toggleLike, removeNote } from '../actions/list'
import Note from './Note'
import NewNote from './NewNote'
import EmptyState from './EmptyState'

const List = styled.FlatList`
  padding: ${Platform.select({
    ios: '20px',
    android: '15px 0', // there's issue with an overflow on android
    // on android instead of separator i'll add additional padding
  })};
`
const Separator = styled.View`
  height: 20px;
`
const Footer = styled.View`
  height: ${Platform.select({
    ios: 40,
    android: 20,
  })};
`

class NotesList extends Component {
  static propTypes = {
    onlyLiked: PropTypes.bool.isRequired,
    adding: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        liked: PropTypes.bool.isRequired,
      }),
    ).isRequired,
    toggleLike: PropTypes.func.isRequired,
    removeNote: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.adding === true && nextProps.adding !== this.props.adding) {
      if (!this.scrolled) {
        this.listRef.scrollToOffset({ offset: 0, animated: true })
      }
    }
    this.scrolled = nextProps.adding
  }

  render() {
    const { adding, onlyLiked, data } = this.props
    return (
      <List
        innerRef={ref => {
          this.listRef = ref
        }}
        data={onlyLiked ? data.filter(x => x.liked) : data}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <Note
            {...item}
            toggleLike={this.props.toggleLike}
            removeNote={this.props.removeNote}
          />
        )}
        ItemSeparatorComponent={Platform.select({
          ios: Separator,
          android: null,
        })}
        ListHeaderComponent={() => (adding ? <NewNote /> : null)}
        ListFooterComponent={Footer}
        ListEmptyComponent={EmptyState}
        {...Platform.select({
          // on-drag will hide keyboard on android, ios doesn't have velocity
          ios: {
            keyboardDismissMode: 'on-drag',
          },
          android: {
            onScroll: ({ nativeEvent }) => {
              if (nativeEvent.velocity.y > 0) {
                Keyboard.dismiss()
              }
            },
          },
        })}
      />
    )
  }
}

export default connect(
  ({ list, navigation }) => ({
    data: list.data,
    ...navigation,
  }),
  {
    toggleLike,
    removeNote,
  },
)(NotesList)
