import {AUTHENTICATION, STUDY} from '../constants';
import { print } from '../../utils/list';

const initialState = {
    permissions: {},
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
    case STUDY.GET_STUDIES_SUCCESS: {
        const list = action.payload.data.study;
        const allSharesArrays = list.map(st => st.shares.map(sh => ({ ...sh, studyId: st.id })));
        const allShares = allSharesArrays.flat();
        const myShares = allShares.filter(sh => sh.user.id === state.profile.id)
        const permissions = {};
        myShares.forEach(sh => {
            permissions[sh.studyId] = sh.role;
        });
        print(permissions)
        return {...state, permissions};
    }
    default:
        return state;
    }
}