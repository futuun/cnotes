import React, { Component } from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components'
import LinearGradient from 'react-native-linear-gradient'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { colors } from '../constants'
import NotesList from '../components/NotesList'

const GradientUnderNav = styled(LinearGradient)`
  height: ${Platform.select({
    android: 80,
    ios: ifIphoneX(88, 64),
  })};
`
const Container = styled.View`
  height: 100%;
  flex: 1;
  background-color: ${colors.background};
`

export default class MainScreen extends Component {
  static navigatorStyle = {
    orientation: 'portrait',
    navBarNoBorder: true,
    navBarTransparent: true,
    drawUnderNavBar: true,
    navBarTranslucent: true,
    topBarElevationShadowEnabled: false,
    drawUnderTabBar: true,
    navBarCustomView: 'cnotes.NavBar',
    navBarComponentAlignment: 'fill',
    statusBarTextColorSchemeSingleScreen: 'light',
    statusBarColor: 'transparent',
    navBarTopPadding: 24,
    drawUnderStatusBar: true,
  }

  render() {
    return (
      <Container>
        <GradientUnderNav
          colors={[colors.primary, colors.primary, colors.secondary]}
          start={{ x: 1.3, y: 0.3 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        <NotesList />
      </Container>
    )
  }
}
