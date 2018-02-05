import { UIManager } from 'react-native'
import app from './app/index'

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

app()
