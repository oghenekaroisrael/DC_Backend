import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import authReducer from './auth';
import profileReducer from './profile';
import agentReducer from './agent';
import assetReducer from './asset';
import deliveryReducer from './delivery';
import locationReducer from './location';

import errorReducer from './error.reducers';
import redirectReducer from './redirect.reducers';

import authActionTypes from '../types/auth';

import preferencesReducer from './preferences.reducers';

const appReducer = combineReducers({
    authReducer,
    assetReducer,
    profileReducer,
    agentReducer,
    deliveryReducer,
    locationReducer,
    errorReducer,
    redirectReducer,
    preferencesReducer
});

const rootReducer = (state, action) => {
    if (action.type === authActionTypes.LOGOUT_REQUEST) {
        // for all keys defined in your persistConfig(s)
        storage.removeItem('persist:root')
        storage.removeItem('token')
        // storage.removeItem('persist:otherKey')

        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;