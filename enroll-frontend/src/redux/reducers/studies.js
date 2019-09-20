import {STUDY, SHARE} from '../constants';
import {addToList, editInlist, removeFromList, sortList} from '../../utils/list';

const initialState = {
    list: []
};

export default function studies(state = initialState, action) {
    switch (action.type) {
    case STUDY.GET_STUDIES_SUCCESS:
        return {...state, list: sortList(action.payload.data, 'name')};
    case STUDY.GET_STUDY_SUCCESS:
        return {...state, study: action.payload.data};
    case STUDY.CREATE_STUDY_SUCCESS:
        return {...state, list: sortList(addToList(state.list, action.payload.data), 'name')};
    case STUDY.UPDATE_STUDY_SUCCESS:
        return {...state, list: sortList(editInlist(state.list, action.payload.data), 'name')};
    case SHARE.CREATE_SHARE_SUCCESS:
        return {...state, list: editInlist(state.list,
            {...action.meta.previousAction.study,
                shares: [...action.meta.previousAction.study.shares, action.payload.data]}, 'name')};
    case SHARE.DELETE_SHARE_SUCCESS:
        return {...state, list: editInlist(state.list,
            {...action.meta.previousAction.study,
                shares: removeFromList(action.meta.previousAction.study.shares,
                    action.payload.data)}, 'name')};
    case STUDY.RESET_STUDY_SUCCESS:
        return {...state, list: sortList(editInlist(state.list, action.payload.data), 'name')};
    default:
        return state;
    }
}