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

iconStyle = (focused) => ({
    alignSelf: 'center',
    fontSize: 35,
    margin: 8,
    color: focused ? '#1D7EE5' : '#8E8E8E'
});