import {COMPARISON, STUDY} from '../constants';

export const fetchStudies = () => ({
    type: STUDY.GET_STUDIES,
    payload: {
        request: {
            url: 'studies',
            method: 'GET'
        }
    }
});

export const fetchStudy = studyId => ({
    type: STUDY.GET_STUDY,
    payload: {
        request: {
            url: `/studies/${studyId}`,
            method: 'GET'
        }
    }
});

export const createStudy = (topic, study) => ({
    type: STUDY.CREATE_STUDY,
    payload: {
        request: {
            url: '/studies',
            method: 'POST',
            params: {
                ...study,
                topicId: topic.id
            }
        }
    }
});

export const updateStudy = study => dispatch => dispatch({
    type: STUDY.UPDATE_STUDY,
    payload: {
        request: {
            url: `/studies/${study.id}`,
            method: 'PUT',
            params: {...study, shares: null, topic: null}
        }
    }
}).then(response => {
    dispatch({type: COMPARISON.UPDATE_STUDY, study});
    return response;
});

export const resetStudy = study => dispatch => dispatch({
    type: STUDY.RESET_STUDY,
    payload: {
        request: {
            url: `/studies/${study.id}`,
            method: 'DELETE'
        }
    }
}).then(response => {
    dispatch({type: COMPARISON.REMOVE_STUDY, study});
    return response;
});