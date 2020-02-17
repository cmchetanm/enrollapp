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

const AuthStack = createStackNavigator({
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
    Topics: {
        screen: Topics,
        navigationOptions: {
            headerTitle: 'Topics'
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
    Studies: {
        screen: Studies,
        navigationOptions: {
            title: 'Studies'
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
    Contacts: {
        screen: Contacts,
        navigationOptions: {
            title: 'Directory'
        }
    },
    Contact: {
        screen: Contact,
        navigationOptions: {
            title: 'Directory Contact'
        }
    },
    NewContact: {
        screen: NewContact,
        navigationOptions: {
            title: 'New Directory Contact'
        }
    },
    EditContact: {
        screen: EditContact,
        navigationOptions: {
            title: 'Edit Contact'
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
            title: 'Directory Contact'
        }
    },
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

export default AuthStack;