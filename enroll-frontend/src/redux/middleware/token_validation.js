import {signOut} from '../actions/authentication';

const tokenValidationMiddleware = store => next => action => {
    const {authentication: {authenticated, headers}} = store.getState();
    const now = Math.floor(new Date().valueOf() / 1000);

    if (authenticated && headers.expiry < now) {
        return next(signOut());
    }

    return next(action);
};

export default tokenValidationMiddleware;