import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fonts, colors } from '../constants'
import { RightButton, LeftButton } from '../components/navigation'
import { toggleLiked, toggleAdd } from '../actions/navigation'

const submitNote = () => 'todo'

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${Platform.select({
    android: `
      margin-right: 16px;
    `,
  })};
`
const Title = styled.Text`
  color: ${colors.navBarDefault};
  font-family: ${fonts.accentFont};
  font-size: 18px;
`

class CustomNavBar extends Component {
  static propTypes = {
    onlyLiked: PropTypes.bool.isRequired,
    adding: PropTypes.bool.isRequired,
    toggleLiked: PropTypes.func.isRequired,
    toggleAdd: PropTypes.func.isRequired,
    submitNote: PropTypes.func.isRequired,
  }

  handleLeftButton = () => {
    const { adding } = this.props

    if (adding) {
      this.props.submitNote()
      this.props.toggleAdd()
    } else {
      this.props.toggleLiked()
    }
  }

  render() {
    const { adding, onlyLiked } = this.props

    return (
      <Container>
        <LeftButton
          adding={adding}
          liked={onlyLiked}
          onPress={this.handleLeftButton}
        />
        <Title>{adding ? 'Add note' : 'Notes'}</Title>
        <RightButton adding={adding} onPress={this.props.toggleAdd} />
      </Container>
    )
  }
}

export default connect(({ navigation }) => navigation, {
  toggleLiked,
  toggleAdd,
  submitNote,
})(CustomNavBar)
