import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import reducers from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import axiosMiddleware from 'redux-axios-middleware';
import client, {axiosConfig} from '../config/axios';
import thunk from 'redux-thunk';
import tokenValidationMiddleware from './middleware/token_validation';

const persistConfig = {key: 'root', storage: AsyncStorage};
const persistedReducer = persistReducer(persistConfig, reducers);
const middleware = applyMiddleware(tokenValidationMiddleware, thunk, axiosMiddleware(client, axiosConfig));
const store = createStore(persistedReducer, composeWithDevTools(middleware));
const persistor = persistStore(store);

// persistor.purge();

export default {store, persistor};