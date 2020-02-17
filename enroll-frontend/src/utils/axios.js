import {Alert} from 'react-native';

export const axiosAlert = (title, error) => {
    if (error.response && error.response.data && error.response.data.errors) {
        if (error.response.data.errors.constructor === Array) {
            Alert.alert(title,
                error.response.data.errors.join('\n'));
        }
        else {
            Alert.alert(title,
                error.response.data.errors.full_messages.join('\n'));
        }
    }
    else if (error.data) {
        Alert.alert(error.data);
    }
    else if (error.message) {
        Alert.alert(`Error: ${error.response.status}`,
            error.message);
    }
    else {
        Alert.alert('Unknown Error', error);
    }
};