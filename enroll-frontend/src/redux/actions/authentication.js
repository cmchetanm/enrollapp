import {AUTHENTICATION} from '../constants';

export const setFCMToken = token => ({
    type: AUTHENTICATION.FCM_TOKEN,
    payload: {
        request: {
            url: '/auth/fcm_token',
            method: 'PUT',
            params: {
                token
            }
        }
    }
});

export const signUp = user => ({
    type: AUTHENTICATION.SIGN_UP,
    payload: {
        request: {
            url: '/auth',
            method: 'POST',
            params: {
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                password: user.password,
                confirmSuccessUrl: 'enroll://enroll'
            }
        }
    }
});

export const signIn = user => ({
    type: AUTHENTICATION.SIGN_IN,
    payload: {
        request: {
            url: '/auth/sign_in',
            method: 'POST',
            params: {
                email: user.email,
                password: user.password
            }
        }
    }
});

export const signOut = () => ({
    type: AUTHENTICATION.SIGN_OUT,
    payload: {
        request: {
            url: '/auth/sign_out',
            method: 'DELETE'
        }
    }
});

export const sendResetPasswordLink = email => ({
    type: AUTHENTICATION.SEND_RESET_PASSWORD_LINK,
    payload: {
        request: {
            url: '/auth/password',
            method: 'POST',
            params: {
                email,
                redirectUrl: 'enroll://auth/reset_password'
            }
        }
    }
});

export const resendConfirmEmailLink = email => ({
    type: AUTHENTICATION.RESEND_CONFIRM_EMAIL_LINK,
    payload: {
        request: {
            url: '/auth/confirmation',
            method: 'POST',
            params: {
                email,
                redirectUrl: 'enroll://enroll'
            }
        }
    }
});

export const resetPassword = params => dispatch => {
    dispatch({
        type: AUTHENTICATION.UPDATE_HEADERS,
        params: {
            uid: params.uid,
            'access-token': params['access-token'],
            client: params.client,
            expiry: params.expiry
        }
    });
    return dispatch({
        type: AUTHENTICATION.RESET_PASSWORD,
        payload: {
            request: {
                url: '/auth/password',
                method: 'PUT',
                params
            }
        }
    });
};

export const resendUnlockInstructions = email => ({
    type: AUTHENTICATION.RESEND_UNLOCK_INSTRUCTIONS,
    payload: {
        request: {
            url: '/auth/unlock',
            method: 'POST',
            params: {
                email,
                redirectUrl: 'enroll://enroll'
            }
        }
    }
});

export const updateProfile = profile => ({
    type: AUTHENTICATION.UPDATE_PROFILE,
    payload: {
        request: {
            url: '/auth',
            method: 'PUT',
            params: {...profile}
        }
    }
});

export const deleteProfile = () => ({
    type: AUTHENTICATION.DELETE_PROFILE,
    payload: {
        request: {
            url: '/auth',
            method: 'DELETE'
        }
    }
});