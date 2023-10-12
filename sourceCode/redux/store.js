
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sliceReducer from './reducer';
import cookies from "./cookiesReducer"

const rootReducer = combineReducers({
    sliceReducer,
    cookies,
  });

const persist_reducer = {
    storage: AsyncStorage,
    key: 'root',
    whitelist: ["cookies"],
}

const persistedReducer = persistReducer(persist_reducer, rootReducer)
 let Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(Store);
 
  export default Store;
 