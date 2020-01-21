import React from 'react';
import {Icon} from 'native-base';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Dashboard from '../screens/Dashboard';
import Topics from '../screens/topics/Topics';
import NewStudy from '../screens/studies/NewStudy';
import Studies from '../screens/studies/Studies';
import Study from '../screens/studies/Study';
import EditStudy from '../screens/studies/EditStudy';
import Profile from '../screens/profile/Profile';
import EditProfile from '../screens/profile/EditProfile';
import Contacts from '../screens/contacts/Contacts';
import Contact from '../screens/contacts/Contact';
import EditContact from '../screens/contacts/EditContact';
import NewContact from '../screens/contacts/NewContact';
import ContactUs from '../screens/ContactUs';
import Person from '../screens/shares/Person';
import ManageContacts from '../screens/studies/ManageContacts';
import Comparison from '../screens/studies/Comparison';
import Disclaimer from '../screens/Disclaimer';
import HowToShareStudies from '../screens/HowToShareStudies';
import Message from '../screens/messages/Message';
import EditMessage from '../screens/messages/EditMessage';
import GuestStack from './GuestStack';
import AppSwitch from './AppSwitch';
import AuthStack from './AuthStack';

const MainStack = createStackNavigator({
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            title: 'Studies'
        }
    },
    ContactUs: {
        screen: ContactUs,
        navigationOptions: {
            title: 'Contact Us'
        }
    },
    HowToShareStudies: {
        screen: HowToShareStudies,
        navigationOptions: {
            title: 'How To Share a Study'
        }
    },
    Disclaimer: {
        screen: Disclaimer,
        navigationOptions: {
            title: 'Disclaimer'
        }
    },
    NewStudy: {
        screen: NewStudy,
        navigationOptions: {
            title: 'Add Study'
        }
    },
    EditStudy: {
        screen: EditStudy,
        navigationOptions: {
            title: 'Edit Study'
        }
    },
    Study: {
        screen: Study,
        navigationOptions: {
            title: 'Study'
        }
    },
    Comparison: {
        screen: Comparison,
        navigationOptions: {
            mode: 'modal',
            title: 'Study Comparison'
        }
    },
    NewContact: {
        screen: NewContact,
        navigationOptions: {
            title: 'New Team Contact'
        }
    },
    ManageContacts: {
        screen: ManageContacts,
        navigationOptions: {
            title: 'Manage Contacts'
        }
    },
    Message: {
        screen: Message,
        navigationOptions: {
            title: 'Message'
        }
    },
    EditMessage: {
        screen: EditMessage,
        navigationOptions: {
            title: 'Edit Message'
        }
    },
    Person: {
        screen: Person,
        navigationOptions: {
            title: 'Team Contact'
        }
    }
});

const ContactsStack = createStackNavigator({
    Contacts: {
        screen: Contacts,
        navigationOptions: {
            title: 'Team Directory'
        }
    },
    Contact: {
        screen: Contact,
        navigationOptions: {
            title: 'Team Contact'
        }
    },
    NewContact: {
        screen: NewContact,
        navigationOptions: {
            title: 'New Team Contact'
        }
    },
    EditContact: {
        screen: EditContact,
        navigationOptions: {
            title: 'Edit Contact'
        }
    }
});

const ProfileStack = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Profile'
        }
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: {
            title: 'Edit Profile'
        }
    }
});

const MainTabs = createBottomTabNavigator({
    AppSwitch: {
        screen: MainStack,
        navigationOptions: {
            tabBarLabel: 'Studies',
            tabBarIcon: ({focused}) => (
                <Icon name='pulse' style={iconStyle(focused)}/>
            )
        },
    },
    Contacts: {
        screen: ContactsStack,
        navigationOptions: {
            tabBarLabel: 'Team',
            tabBarIcon: ({focused}) => (
                <Icon name='people' style={iconStyle(focused)}/>
            )
        },
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: 'More',
            tabBarIcon: ({focused}) => (
                <Icon name='more' style={iconStyle(focused)}/>
            )
        },
    },
});
// , {
//         initialRouteName: 'AppSwitch',
//         headerMode: "screen",
//         mode: Platform.OS === "ios" ? "modal" : "card",
//         navigationOptions: {
//             cardStack: {
//                 gesturesEnabled: false
//             },
//             gesturesEnabled: false
//         },
//         gesturesEnabled: false,
//         transitionConfig: TransitionConfiguration,
// });

// export default MainTabs;

export default createStackNavigator({
    MainTabs,
    Study
}, {headerMode: 'none'})