import {CONTACT} from '../constants';
import {editInlist, sortList, removeFromList, addToList, print} from '../../utils/list';

const initialState = {
    contacts: [],
    peers: []
};

export default function contacts(state = initialState, action) {
    switch (action.type) {
    case CONTACT.GET_CONTACTS_SUCCESS: {
        return {...state, contacts: action.payload.data};
    }
    case CONTACT.GET_PEERS_SUCCESS: {
        return {...state, peers: action.payload.data};
    }
    case CONTACT.CREATE_CONTACT_SUCCESS:
        return {...state, contacts: sortList(addToList(state.contacts, action.payload.data), 'fullName')};
    case CONTACT.UPDATE_CONTACT_SUCCESS:
        return {...state, contacts: sortList(editInlist(state.contacts, action.payload.data), 'fullName')};
    case CONTACT.DELETE_CONTACT_SUCCESS:
        return {...state, contacts: removeFromList(state.contacts, action.payload.data)};
    case CONTACT.MIRROR_UPDATE_CONTACT_SUCCESS:
        return {...state, contacts: sortList(editInlist(state.contacts, action.contact), 'fullName')};
    default:
        return state;
    }
}