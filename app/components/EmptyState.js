import React, { Component } from 'react'
import styled from 'styled-components'
import Lottie from 'lottie-react-native'
import { Animated } from 'react-native'
import emptyState from '../assets/lottie/emptyState.json'
import { TextAccent } from './styled'

const LottieTick = styled(Lottie)`
  width: 100%;
  height: 400px;
  margin-top: -20px;
`
const Container = styled.View`
  align-items: center;
  justify-content: center;
`
const TAccent = TextAccent.extend`
  font-size: 13px;
  text-align: center;
`

export default class EmptyState extends Component {
  constructor(props) {
    super(props)

    this.aEmptyState = new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(this.aEmptyState, {
      toValue: 1,
      duration: 3000,
    }).start()
  }

  render() {
    return (
      <Container {...this.props}>
        <LottieTick
          source={emptyState}
          progress={this.aEmptyState}
          hardwareAccelerationAndroid
        />
        <TAccent>404 notes not found</TAccent>
      </Container>
    )
  }
}
