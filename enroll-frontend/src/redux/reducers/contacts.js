import {CONTACT} from '../constants';
import {editInlist, sortList, removeFromList, addToList} from '../../utils/list';

const initialState = {
    list: []
};

export default function contacts(state = initialState, action) {
    switch (action.type) {
    case CONTACT.GET_CONTACTS_SUCCESS:
        return {...state, list: action.payload.data};
    case CONTACT.CREATE_CONTACT_SUCCESS:
        return {...state, list: sortList(addToList(state.list, action.payload.data), 'fullName')};
    case CONTACT.UPDATE_CONTACT_SUCCESS:
        return {...state, list: sortList(editInlist(state.list, action.payload.data), 'fullName')};
    case CONTACT.DELETE_CONTACT_SUCCESS:
        return {...state, list: removeFromList(state.list, action.payload.data)};
    case CONTACT.MIRROR_UPDATE_CONTACT_SUCCESS:
        return {...state, list: sortList(editInlist(state.list, action.contact), 'fullName')};
    default:
        return state;
    }
}