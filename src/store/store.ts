import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth/auth.reducer';
import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist/es/types';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import { userReducer } from './user/user.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

type ExtendedPersitConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersitConfig = {
  key: 'root',
  storage,
  whitelist: [
    'auth',
    'user'
  ],
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  auth: authReducer,
  user: userReducer,
}));

const store = configureStore({
  reducer: persistedReducer,
  middleware: [ logger ]
});

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;
