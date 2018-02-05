import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Lottie from 'lottie-react-native'
import { Animated, Easing, TouchableWithoutFeedback, View } from 'react-native'
import plus from '../../assets/lottie/plus.json'

const LottieTick = styled(Lottie)`
  width: 40px;
  height: 40px;
`

export default class RightButton extends Component {
  static propTypes = {
    adding: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.aRightButton = new Animated.Value(0)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.adding !== this.props.adding) {
      this.handleAnimation()
    }
  }

  handleAnimation() {
    if (this.props.adding) {
      Animated.timing(this.aRightButton, {
        toValue: 0,
        easing: Easing.ease,
        duration: 800,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(this.aRightButton, {
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        duration: 800,
        useNativeDriver: true,
      }).start()
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View>
          <LottieTick
            source={plus}
            progress={this.aRightButton}
            hardwareAccelerationAndroid
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
