import { Navigation } from 'react-native-navigation'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'remote-redux-devtools'
import registerScreens from './screens'
import reducers from './reducers'

console.disableYellowBox = true // eslint-disable-line no-console

const composeFunction = __DEV__ ? composeWithDevTools : compose

const persistConfig = {
  key: 'cnotes',
  storage,
  debug: __DEV__,
}

const store = createStore(
  persistReducer(persistConfig, reducers),
  composeFunction(applyMiddleware(thunkMiddleware)),
)

persistStore(store)

if (module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = require('./reducers').default; // eslint-disable-line
    store.replaceReducer(persistReducer(persistConfig, nextRootReducer))
  })
}

registerScreens(store)

export default function startApp() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'cnotes.MainScreen',
      navigatorStyle: {},
      navigatorButtons: {},
    },
  })
}
