import {COMPARISON} from '../constants';

const initialState = {
    list: []
};

export default function comparison(state = initialState, action) {
    switch (action.type) {
    case COMPARISON.ADD_STUDY:
        return {...state, list: [...state.list, action.study.id]};
    case COMPARISON.UPDATE_STUDY:
        const index = state.list.indexOf(action.study.id);

        if (index >= 0) {
            return {
                ...state, list: [
                    ...state.list.slice(0, index),
                    action.study.id,
                    ...state.list.slice(index + 1)
                ]
            };
        }

        return {...state};
    case COMPARISON.REMOVE_STUDY:
        state.list.splice(state.list.indexOf(action.study.id), 1);
        return {...state, list: [...state.list]};
    case COMPARISON.REMOVE_ALL_STUDIES:
        return {...state, list: []};
    default:
        return state;
    }
}