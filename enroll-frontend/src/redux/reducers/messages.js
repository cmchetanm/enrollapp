import {MESSAGE} from '../constants';
import {editInlist, removeFromList} from '../../utils/list';

const initialState = {
    list: {}
};

export default function messages(state = initialState, action) {
    switch (action.type) {
    case MESSAGE.GET_MESSAGES_SUCCESS:
        state.list[action.meta.previousAction.studyId] = action.payload.data;
        return {...state, list: {...state.list}};
    case MESSAGE.CREATE_MESSAGE_SUCCESS:
        state.list[action.meta.previousAction.studyId] = [
            action.payload.data, ...state.list[action.meta.previousAction.studyId]];
        return {...state, list: {...state.list}};
    case MESSAGE.UPDATE_MESSAGE_SUCCESS:
        state.list[action.payload.data.studyId] = editInlist(state.list[action.payload.data.studyId],
            action.payload.data);
        return {...state, list: {...state.list}};
    case MESSAGE.DELETE_MESSAGE_SUCCESS:
        state.list[action.payload.data.studyId] = removeFromList(state.list[action.payload.data.studyId],
            action.payload.data);
        return {...state, list: {...state.list}};
    default:
        return state;
    }
}