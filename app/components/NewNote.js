import React, { Component } from 'react'
import { Platform, LayoutAnimation } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { colors, fonts } from '../constants'
import { Card } from '../components/styled'
import { textChange } from '../actions/list'

const Note = Card.extend`
  margin-bottom: ${Platform.select({
    ios: '20px',
    android: '40px',
  })};
  elevation: 8;
`
const TextInput = styled.TextInput`
  color: ${colors.fontDefault};
  font-family: ${fonts.defaultFont};
  font-size: 13px;
  line-height: 18px;
`

class NewNote extends Component {
  static propTypes = {
    textChange: PropTypes.func.isRequired,
    currentNote: PropTypes.string.isRequired,
  }

  componentDidMount() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }

  componentWillUnmount() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }

  render() {
    return (
      <Note>
        <TextInput
          value={this.props.currentNote}
          onChangeText={this.props.textChange}
          placeholder="What's on your mind?"
          clearButtonMode="while-editing"
          enablesReturnKeyAutomatically
          maxHeight={100}
          underlineColorAndroid={colors.secondary}
          multiline
          autoFocus
        />
      </Note>
    )
  }
}

export default connect(
  ({ list }) => ({
    currentNote: list.currentNote,
  }),
  { textChange },
)(NewNote)
