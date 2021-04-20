import React from 'react';
import * as Font from 'expo-font';
import SwitchNavigator from './navigation/SwitchNavigator';

// redux
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react'
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import savedReducer from './store/reducers/saved';
import audioReducer from './store/reducers/audio';
import userReducer from './store/reducers/user';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
const queryClient = new QueryClient()

const savedPersistConfig = {
  key: 'saved',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  saved: persistReducer(savedPersistConfig, savedReducer),
  user: persistReducer(savedPersistConfig, userReducer),
  audio: audioReducer
});

//redux thunk allows our redux actions to be asyncronous
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const persistor = persistStore(store)

export default function App() {
  const [loaded] = Font.useFonts({
    popB: require('./assets/fonts/poppinsB.ttf'),
    popM: require('./assets/fonts/poppinsM.ttf')
  })

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <SwitchNavigator />
          </SafeAreaProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
