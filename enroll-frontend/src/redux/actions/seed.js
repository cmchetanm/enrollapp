import {fetchTopics} from './topics';
import {axiosAlert} from '../../utils/axios';
import {fetchStudies} from './studies';
import {fetchPeers, fetchContacts} from './contacts';
import { print } from '../../utils/list';

export const loadUserData = () => dispatch => {
    dispatch(fetchTopics()).then(res => {
        if (res.error) {
            axiosAlert('Unable to load topics.', res.error);
        }
    });

    dispatch(fetchStudies()).then(res => {
        if (res.error) {
            axiosAlert('Unable to load studies.', res.error);
        }
    });

    // dispatch(fetchContacts()).then(res => {
    //     if (res.error) {
    //         axiosAlert('Unable to load study team directory.', res.error);
    //     }
    // });

    dispatch(fetchPeers()).then(res => {
        if (res.error) {
            axiosAlert('Unable to load study team directory.', res.error);
        }
    });
};