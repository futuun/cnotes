import { Platform } from 'react-native'

export const colors = {
  primary: '#c43553',
  secondary: '#f89750',
  inactive: '#d0d0d0',
  fontAccent: '#eb7f51',
  fontDefault: '#6b6d78',
  navBarDefault: '#fff',
  cardBg: '#fff',
  background: '#f9f9f9',
}

export const fonts = {
  defaultFont: 'iosevka-light',
  accentFont: Platform.select({
    android: 'iosevka-regular',
    ios: 'iosevka',
  }),
}
