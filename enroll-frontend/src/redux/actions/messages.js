import {MESSAGE} from '../constants';

export const fetchMessages = studyId => ({
    type: MESSAGE.GET_MESSAGES,
    studyId,
    payload: {
        request: {
            url: '/messages',
            method: 'GET',
            params: {studyId}
        }
    }
});

export const createMessage = (studyId, text) => ({
    type: MESSAGE.CREATE_MESSAGE,
    studyId,
    payload: {
        request: {
            url: '/messages',
            method: 'POST',
            params: {studyId, text}
        }
    }
});

export const updateMessage = (messageId, text) => ({
    type: MESSAGE.UPDATE_MESSAGE,
    payload: {
        request: {
            url: `/messages/${messageId}`,
            method: 'PUT',
            params: {text}
        }
    }
});

export const deleteMessage = messageId => ({
    type: MESSAGE.DELETE_MESSAGE,
    payload: {
        request: {
            url: `/messages/${messageId}`,
            method: 'DELETE'
        }
    }
});