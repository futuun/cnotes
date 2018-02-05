import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Lottie from 'lottie-react-native'
import { Animated, Easing, TouchableWithoutFeedback, View } from 'react-native'
import heart from '../../assets/lottie/heart.json'

const LottieTick = styled(Lottie)`
  width: 40px;
  height: 40px;
`
const heartConfig = {
  fromAdding: {
    from: 112 / 730,
    to: 180 / 730,
  },
  like: {
    from: 215 / 730,
    to: 266 / 730,
  },
  unlike: {
    from: 326 / 730,
    to: 423 / 730,
  },
  toAdding: {
    from: 513 / 730,
    to: 570 / 730,
  },
}

export default class LeftButton extends Component {
  static propTypes = {
    liked: PropTypes.bool.isRequired,
    adding: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.aLeftButton = new Animated.Value(0.29)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.liked !== this.props.liked &&
      nextProps.adding !== this.props.adding
    ) {
      this.fromLikeToAdding()
    } else if (nextProps.liked !== this.props.liked) {
      if (nextProps.liked) {
        this.like()
      } else {
        this.unlike()
      }
    } else if (nextProps.adding !== this.props.adding) {
      if (nextProps.adding) {
        this.toAdding()
      } else {
        this.fromAdding()
      }
    }
  }

  fromLikeToAdding() {
    const { toAdding } = heartConfig
    Animated.timing(this.aLeftButton, {
      toValue: toAdding.to,
      duration: 800,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: true,
    }).start()
  }

  toAdding() {
    const { toAdding } = heartConfig
    this.aLeftButton.setValue(toAdding.from)
    Animated.timing(this.aLeftButton, {
      toValue: toAdding.to,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }

  fromAdding() {
    const { fromAdding } = heartConfig
    this.aLeftButton.setValue(fromAdding.from)
    Animated.timing(this.aLeftButton, {
      toValue: fromAdding.to,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }

  like() {
    const { like } = heartConfig
    this.aLeftButton.setValue(like.from)
    Animated.timing(this.aLeftButton, {
      toValue: like.to,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }

  unlike() {
    const { unlike } = heartConfig
    this.aLeftButton.setValue(unlike.from)
    Animated.timing(this.aLeftButton, {
      toValue: unlike.to,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View>
          <LottieTick
            source={heart}
            progress={this.aLeftButton}
            hardwareAccelerationAndroid
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
