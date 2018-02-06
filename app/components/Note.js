import React, { Component } from 'react'
import { Animated, Easing, LayoutAnimation, Platform, View } from 'react-native'
import PropTypes from 'prop-types'
import Lottie from 'lottie-react-native'
import Interactable from 'react-native-interactable'
import styled from 'styled-components'
import { DateTime } from 'luxon'
import { colors } from '../constants'
import like from '../assets/lottie/like.json'
import trashCan from '../assets/lottie/trashCan.json'
import { BasicCard, Card, TextAccent, TextDefault } from './styled'

const LikeIndicator = styled(Animated.View)`
  position: absolute;
  width: 5px;
  height: 65%;
  margin-top: 17;
  margin-left: ${Platform.select({
    ios: '-2px',
    android: '18px',
  })};
  background-color: ${colors.secondary};
  border-radius: 5px;
`
const LottieWrapper = styled(Lottie)`
  width: 44px;
  height: 44px;
`
const Container = styled.View`
  position: relative;
  justify-content: center;
`
const BackgroundCard = BasicCard.extend`
  position: absolute;
  flex-direction: row;
  align-self: center;
  justify-content: space-between;
  padding: 0 23px;
`
const Title = TextAccent.extend`
  margin-bottom: 10px;
`

export default class Note extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    liked: PropTypes.bool.isRequired,
    toggleLike: PropTypes.func.isRequired,
    removeNote: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.aXAxis = new Animated.Value(0)
    this.aShadow = new Animated.Value(0)
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.id !== nextProps.id || this.props.liked !== nextProps.liked
    )
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      // sorry android guys: https://github.com/facebook/react-native/issues/17118
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }
  }

  handleCardSnap(xAxis) {
    const { id } = this.props
    if (xAxis === 100) {
      // here it would be great to force-set animated value that we are using to animate heart
      // without that heart will 'jump' right after prop 'liked' will change
      // i wasn't able to find solution, the only working implementation was using forceUpdate
      this.props.toggleLike(id)
    } else if (xAxis === -100) {
      if (Platform.OS === 'android') {
        // layout animation works on android when only 1 item is changing
        // we can use that to animate removal
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      }
      this.props.removeNote(id)
    }
  }

  startShadowAnimation = () => {
    Animated.timing(this.aShadow, {
      toValue: 1,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      duration: 195,
    }).start()
  }

  endShadowAnimation = () => {
    Animated.timing(this.aShadow, {
      toValue: 0,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      duration: 225,
    }).start()
  }

  handleCardDrag = ({ nativeEvent }) => {
    switch (nativeEvent.state) {
      case 'start':
        this.startShadowAnimation()
        break
      case 'end':
        this.endShadowAnimation()
        break
      default:
    }

    if (
      nativeEvent.targetSnapPointId === 'center' &&
      Math.abs(nativeEvent.x) === 100
    ) {
      // we wan't to trigger actions only when x is equal to 100 or -100
      this.handleCardSnap(nativeEvent.x)
    }
  }

  render() {
    const { id, text, liked } = this.props

    const aLeftIcon = liked
      ? this.aXAxis.interpolate({
          inputRange: [0, 60, 100],
          outputRange: [0.5, 0.5, 1],
          extrapolate: 'clamp',
        })
      : this.aXAxis.interpolate({
          inputRange: [0, 60, 100],
          outputRange: [0, 0, 0.5],
          extrapolate: 'clamp',
        })
    const aRightIcon = this.aXAxis.interpolate({
      inputRange: [-100, -80, 0],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    })
    const styles = {
      trashCan: {
        transform: [
          {
            scale: this.aXAxis.interpolate({
              inputRange: [-100, -80, -23, 0],
              outputRange: [1, 1, 0, 0],
            }),
          },
        ],
      },
      cardStyles: {
        shadowColor: this.aShadow.interpolate({
          inputRange: [0, 1],
          outputRange: [colors.inactive, colors.secondary],
        }),
        elevation: this.aShadow.interpolate({
          inputRange: [0, 1],
          outputRange: [2, 8],
        }),
        shadowOffset: {
          width: 0,
          height: new Animated.Value(5), // https://github.com/facebook/react-native/issues/14868
        },
      },
      likeIndicator: {
        transform: [
          {
            scaleY: this.aXAxis.interpolate({
              inputRange: [0, 23, 55, 100],
              outputRange: [1, 1, 0, 0],
            }),
          },
        ],
      },
    }

    return (
      <Container>
        <BackgroundCard>
          <View>
            {/* those views are needed on ios due to: https://github.com/airbnb/lottie-react-native/issues/106 */}
            <LottieWrapper source={like} progress={aLeftIcon} />
          </View>
          <Animated.View style={styles.trashCan}>
            <LottieWrapper source={trashCan} progress={aRightIcon} />
          </Animated.View>
        </BackgroundCard>
        <Interactable.View
          snapPoints={[{ x: 0, id: 'center' }]}
          boundaries={{ left: -100, right: 100 }}
          animatedValueX={this.aXAxis}
          onTouchStart={this.startShadowAnimation}
          onTouchEnd={this.endShadowAnimation}
          onDrag={this.handleCardDrag}
          animatedNativeDriver
          horizontalOnly
        >
          {liked ? <LikeIndicator style={styles.likeIndicator} /> : null}
          <Card style={styles.cardStyles}>
            <Title>
              {DateTime.fromMillis(id * 1000).toLocaleString(
                DateTime.DATETIME_SHORT_WITH_SECONDS,
              )}
            </Title>
            <TextDefault>{text}</TextDefault>
          </Card>
        </Interactable.View>
      </Container>
    )
  }
}
