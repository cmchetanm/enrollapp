import {createStackNavigator} from 'react-navigation-stack';
import SignIn from '../screens/authentication/SignIn';
import SignUp from '../screens/authentication/SignUp';
import ForgotPassword from '../screens/authentication/ForgotPassword';
import ResetPassword from '../screens/authentication/ResetPassword';
import ResendConfirmEmail from '../screens/authentication/ResendConfirmEmail';
import ResendUnlockInstructions from '../screens/authentication/ResendUnlockInstructions';

const GuestStack = createStackNavigator({
    SignIn: {
        screen: SignIn
    },
    SignUp: {
        screen: SignUp,
        path: 'sign_up'
    },
    ForgotPassword: {
        screen: ForgotPassword
    },
    ResendConfirmEmail: {
        screen: ResendConfirmEmail
    },
    ResetPassword: {
        screen: ResetPassword,
        path: 'reset_password'
    },
    ResendUnlockInstructions: {
        screen: ResendUnlockInstructions
    }
}, {
    mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
});

export default GuestStack;