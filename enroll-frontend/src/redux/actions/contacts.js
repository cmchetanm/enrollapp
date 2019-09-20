import {CONTACT} from '../constants';
import {fetchStudies} from './studies';

export const fetchContacts = () => ({
    type: CONTACT.GET_CONTACTS,
    payload: {
        request: {
            url: '/contacts',
            method: 'GET'
        }
    }
});

export const createContact = contact => dispatch => dispatch({
    type: CONTACT.CREATE_CONTACT,
    payload: {
        request: {
            url: '/contacts',
            method: 'POST',
            params: {...contact}
        }
    }
}).then(response => {
    if (response.error) {
        return response;
    }

    dispatch(fetchStudies());

    return response;
});

export const updateContact = contact => dispatch => dispatch({
    type: CONTACT.UPDATE_CONTACT,
    payload: {
        request: {
            url: `/contacts/${contact.id}`,
            method: 'PUT',
            params: {...contact}
        }
    }
}).then(response => {
    if (response.error) {
        return response;
    }

    dispatch(fetchStudies());

    return response;
});

export const deleteContact = contact => dispatch => dispatch({
    type: CONTACT.DELETE_CONTACT,
    payload: {
        request: {
            url: `/contacts/${contact.id}`,
            method: 'DELETE'
        }
    }
}).then(response => {
    if (response.error) {
        return response;
    }

    dispatch(fetchStudies());

    return response;
});