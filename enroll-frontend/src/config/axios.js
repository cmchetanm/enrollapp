import {API} from '../../settings.json';
import snakeCaseKeys from 'snakecase-keys';
import axios from 'axios';

const client = axios.create({
    baseURL: API.baseURL,
    responseType: 'json'
});

export const axiosConfig = {
    interceptors: {
        request: [
            (action, request) => {
                const {authentication: {headers}} = action.getState();
                request.headers['access-token'] = headers['access-token'];
                request.headers.expiry = headers.expiry;
                request.headers.client = headers.client;
                request.headers.uid = headers.uid;

                if (request.params) {
                    request.params = snakeCaseKeys(request.params);
                }

                return request;
            }
        ],
        response: [
            (action, request) => request
        ]
    }
};

export default client;