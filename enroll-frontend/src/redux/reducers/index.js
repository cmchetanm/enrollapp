import authentication from './authentication';
import comparison from './comparison';
import {combineReducers} from 'redux';
import topics from './topics';
import {AUTHENTICATION} from '../constants';
import contacts from './contacts';
import messages from './messages';
import studies from './studies';

const appReducer = combineReducers({
    authentication,
    comparison,
    topics,
    contacts,
    messages,
    studies
});

const DESTRUCTIVE_ACTIONS =
    [
        AUTHENTICATION.SIGN_OUT_SUCCESS,
        AUTHENTICATION.SIGN_OUT_FAIL,
        AUTHENTICATION.DELETE_PROFILE_SUCCESS
    ];

const rootReducer = (state, action) => {
    if (DESTRUCTIVE_ACTIONS.includes(action.type) || action.error &&
        action.error.response && action.error.response.status === 401
    ) {
        return appReducer({}, action);
    }

    let responseHeaders;

    if (action.payload) {
        responseHeaders = action.payload.headers;
    }
    else if (action.error && action.error.response) {
        responseHeaders = action.error.response.headers;
    }

    if (responseHeaders) {
        const headers = {
            'access-token':
                responseHeaders['access-token'] ||
                state.authentication.headers['access-token'],
            client: responseHeaders.client || state.authentication.headers.client,
            expiry: responseHeaders.expiry || state.authentication.headers.expiry,
            uid: responseHeaders.uid || state.authentication.headers.uid
        };

        return appReducer({...state, authentication: {...state.authentication, headers}},
            action);
    }

    return appReducer(state, action);
};

export default rootReducer;