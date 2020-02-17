import {STUDY, SHARE, CONTACT} from '../constants';
import {addToList, editInlist, removeFromList, sortList, print} from '../../utils/list';

const initialState = {
    list: []
};

export default function studies(state = initialState, action) {
    switch (action.type) {
    case STUDY.GET_STUDIES_SUCCESS: {
        const list = action.payload.data.study;
        return {...state, list: sortList(list, 'name')};
    }
    case STUDY.GET_STUDY_SUCCESS:
        return {...state, study: action.payload.data};
    case STUDY.CREATE_STUDY_SUCCESS:
        return {...state, list: sortList(addToList(state.list, action.payload.data), 'name')};
    case STUDY.UPDATE_STUDY_SUCCESS:
        return {...state, list: sortList(editInlist(state.list, action.payload.data), 'name')};
    case SHARE.CREATE_SHARES_SUCCESS: {
        return {...state, list: editInlist(state.list,
            {...action.meta.previousAction.study,
                shares: [...action.meta.previousAction.study.shares, action.payload.data]}, 'name')};
    }
    // case SHARE.CREATE_SHARES: {
    //     print('CREATE_SHARES_SUCCESS reducer');
    //     print('action.payload.meta.shares');
    //     print(action.payload.meta.shares);
    //     const newList = state.list.slice();
    //     action.payload.meta.shares.forEach(share => {
    //         const curStudyIndex = newList.findIndex(study => study.id === share.studyId);
    //         const shares = newList[curStudyIndex].shares.slice();
    //         shares.push(share);
    //         newList[curStudyIndex] = {
    //             ...newList[curStudyIndex],
    //             shares
    //         };
    //     });
    //     return { ...state, list: newList };
    // }
    case SHARE.CREATE_SHARE_SUCCESS: {
        return {...state, list: editInlist(state.list,
            {...action.meta.previousAction.study,
                shares: [...action.meta.previousAction.study.shares, action.payload.data]}, 'name')};
    }
    case SHARE.DELETE_SHARE_SUCCESS: {
        return {...state, list: editInlist(state.list,
            {...action.meta.previousAction.study,
                shares: removeFromList(action.meta.previousAction.study.shares,
                    action.payload.data)}, 'name')};
    }
    case STUDY.RESET_STUDY_SUCCESS:
        return {...state, list: sortList(editInlist(state.list, action.payload.data), 'name')};
    default:
        return state;
    }
}