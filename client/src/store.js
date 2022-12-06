import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';


const persistConfig = {
    key: 'reducer',
    storage,
};
const reducers = combineReducers({reducer: userReducer});

const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = configureStore({ reducer: userReducer })
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
      }),
});

// export const store = configureStore({ reducer: userReducer })

// console.log(store.getState())
