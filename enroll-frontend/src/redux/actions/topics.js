import {TOPIC} from '../constants';

export const fetchTopics = () => ({
    type: TOPIC.GET_TOPICS,
    payload: {
        request: {
            url: '/topics',
            method: 'GET'
        }
    }
});

export const createTopic = topic => ({
    type: TOPIC.CREATE_TOPIC,
    payload: {
        request: {
            url: '/topics',
            method: 'POST',
            params: {...topic}
        }
    }
});

export const updateTopic = topic => ({
    type: TOPIC.UPDATE_TOPIC,
    payload: {
        request: {
            url: `/topics/${topic.id}`,
            method: 'PUT',
            params: {...topic}
        }
    }
});

export const deleteTopic = topic => ({
    type: TOPIC.DELETE_TOPIC,
    payload: {
        request: {
            url: `/topics/${topic.id}`,
            method: 'DELETE'
        }
    }
});