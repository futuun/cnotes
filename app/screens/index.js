import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import MainScreen from './MainScreen'
import NavBar from './NavBar'

export default function registerScreens(store) {
  Navigation.registerComponent(
    'cnotes.MainScreen',
    () => MainScreen,
    store,
    Provider,
  )

  Navigation.registerComponent('cnotes.NavBar', () => NavBar, store, Provider)
}
