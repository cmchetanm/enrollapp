import {COMPARISON} from '../constants';

export const addToCompareList = study => ({
    type: COMPARISON.ADD_STUDY, study
});

export const removeFromCompareList = study => ({
    type: COMPARISON.REMOVE_STUDY, study
});

export const resetCompareList = () => ({
    type: COMPARISON.REMOVE_ALL_STUDIES
});