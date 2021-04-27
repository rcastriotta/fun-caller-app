import React from "react";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import savedReducer from "./reducers/saved";
import userReducer from "./reducers/user";
import audioReducer from "./reducers/audio";

const savedPersistConfig = {
  key: "saved",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  saved: persistReducer(savedPersistConfig, savedReducer),
  user: persistReducer(savedPersistConfig, userReducer),
  audio: audioReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);

const ReduxWrapper = (props) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {props.children}
    </PersistGate>
  </Provider>
);

export default ReduxWrapper;
