import styled from 'styled-components'
import { colors, fonts } from '../constants'

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
