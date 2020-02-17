import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AppSwitch from './AppSwitch';
import AuthStack from './AuthStack';
import GuestStack from './GuestStack';
import MainTabs from './MainTabs';

const Router = createAppContainer(createSwitchNavigator({
    MainTabs,
    AppSwitch,
    Auth: AuthStack,
    Guest: {
        screen: GuestStack,
        path: 'auth'
    }
},
{
    initialRouteName: 'AppSwitch'
}));

export default Router;
