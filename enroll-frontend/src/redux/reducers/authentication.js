import {AUTHENTICATION} from '../constants';

const initialState = {
    authenticated: false,
    headers: {},
    profile: null
};

const updateHeaders = (state, action) => {
    switch (action.type) {
    case AUTHENTICATION.UPDATE_HEADERS:
        return {
            ...state,
            ...action.params
        };
    default:
        return state;
    }
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
    case AUTHENTICATION.SIGN_IN_SUCCESS:
        return {...state, authenticated: true, profile: action.payload.data};
    case AUTHENTICATION.SIGN_OUT:
        return {...state, authenticated: false};
    case AUTHENTICATION.UPDATE_PROFILE_SUCCESS:
        return {...state, profile: action.payload.data};
    case AUTHENTICATION.UPDATE_HEADERS:
        return {...state, headers: updateHeaders(state.headers, action)};
    default:
        return state;
    }
}