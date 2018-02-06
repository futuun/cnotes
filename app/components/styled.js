import { Animated, Platform, Dimensions } from 'react-native'
import styled from 'styled-components'
import { colors, fonts } from '../constants'

const { width } = Dimensions.get('window')

export const TextAccent = styled.Text`
  color: ${colors.fontAccent};
  font-family: ${fonts.accentFont};
  font-size: 12px;
`
export const TextDefault = styled.Text`
  color: ${colors.fontDefault};
  font-family: ${fonts.defaultFont};
  font-size: 13px;
  line-height: 18px;
`
export const BasicCard = styled(Animated.View)`
  width: ${Platform.select({
    ios: '100%',
    android: `${width - 40}px`, // due to issues with overflow
  })};
  margin: ${Platform.select({
    ios: 0, // ios has separator component
    android: '3px 20px 12px 20px',
  })};
  border-radius: 10px;
`
export const Card = BasicCard.extend`
  padding: 20px;
  background-color: ${colors.cardBg};
  elevation: 2;
  shadow-color: ${colors.secondary};
  shadow-offset: 0 5px;
  shadow-opacity: 0.45;
  shadow-radius: 5px;
`
