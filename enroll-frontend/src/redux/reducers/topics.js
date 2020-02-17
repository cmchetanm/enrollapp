import {TOPIC} from '../constants';
import {addToList, editInlist, removeFromList, sortList} from '../../utils/list';

const initialState = {
    list: []
};

const mergeTopicsWithSameName = list => {
    if (list.length > 0) {
        const newList = [];
        let i = 0;

        for (const topic of list) {
            if (i === 0 || topic.name !== newList[i - 1].name) {
                topic.ids = [topic.id];
                delete topic.id;
                newList.push(topic);
                i++;
            }
            else {
                newList[i - 1].ids.push(topic.id);
            }
        }

        return newList;
    }

    return list;
};

export default function topics(state = initialState, action) {
    switch (action.type) {
    case TOPIC.GET_TOPICS_SUCCESS:
        return {...state, list: mergeTopicsWithSameName(sortList(action.payload.data, 'name'))};
    case TOPIC.CREATE_TOPIC_SUCCESS:
        return {...state, list: sortList(addToList(state.list, action.payload.data), 'name')};
    case TOPIC.UPDATE_TOPIC_SUCCESS:
        return {...state, list: sortList(editInlist(state.list, action.payload.data), 'name')};
    case TOPIC.DELETE_TOPIC_SUCCESS:
        return {...state, list: removeFromList(state.list, action.payload.data)};
    default:
        return state;
    }
}