import {CONTACT, SHARE} from '../constants';

export const createShare = (contactId, study, role, contact) => dispatch => dispatch({
    type: SHARE.CREATE_SHARE,
    study,
    payload: {
        request: {
            url: '/shares',
            method: 'POST',
            params: {contactId, studyId: study.id, role}
        }
    }
}).then(response => {
    if (!contact || response.error) {
        return response;
    }

    const contactToUpdateAs = {...contact, userId: response.payload.data.user.id};
    dispatch({
        type: CONTACT.MIRROR_UPDATE_CONTACT_SUCCESS,
        contact: {...contactToUpdateAs}
    });

    return response;
});

export const deleteShare = (share, study) => ({
    type: SHARE.DELETE_SHARE,
    study,
    payload: {
        request: {
            url: `/shares/${share.id}`,
            method: 'DELETE',
            params: {studyId: study.id}
        }
    }
});