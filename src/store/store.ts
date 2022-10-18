import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth/auth.reducer';
import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist/es/types';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import { userReducer } from './user/user.reducer';
import { langReducer } from './lang/lang.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  lang: langReducer,
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
    'user',
    'lang'
  ],
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  auth: authReducer,
  user: userReducer,
  lang: langReducer,
}));

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false
    });
    
    if (process.env.NODE_ENV !== 'production') {
      return middlewares.concat(logger);
    }

    return middlewares;
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;
