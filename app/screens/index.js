import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import MainScreen from './MainScreen'

export default function registerScreens(store) {
  Navigation.registerComponent(
    'cnotes.MainScreen',
    () => MainScreen,
    store,
    Provider,
  )
}
