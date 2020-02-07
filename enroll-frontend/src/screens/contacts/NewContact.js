import React, {PureComponent} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {Container, Content} from 'native-base';
import {createContact} from '../../redux/actions/contacts';
import {axiosAlert} from '../../utils/axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ContactForm from '../../components/contacts/ContactForm';
import Loading from '../../components/network/Loading';
import { print } from '../../utils/list';

class NewContact extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Invite a Colleague',
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          marginLeft: 15,
          marginTop: 15,
        },
        headerStyle: {
          backgroundColor: '#3F51B5',
          height: 70
        },
        headerRight: (() => (
            <TouchableOpacity
                onPress={navigation.getParam('handleSubmit')}
                style={{ marginTop: 12, marginRight: 12 }}
            >
                <Text style={{ fontSize: 17, color: '#FFFFFF' }}>Add</Text>
            </TouchableOpacity>
        ))
    });

    state = {loading: false, contact: { phoneNumber: '', email: '', lastName: '', firstName: '', role: '', study: '' } };

    componentDidMount() {
        this.props.navigation.setParams({handleSubmit: this.handleSubmit});
    }

    handleSubmit = () => {
        const {dispatch, navigation} = this.props;
        this.setState({loading: true});
        print(this.state.contact);

        dispatch(createContact(this.state.contact)).then(response => {
            this.setState({loading: false});

            if (response.error) {
                axiosAlert('Unable to create contact.', response.error);
            }
            else {
                navigation.goBack();
            }
        });
    };

    render() {
        print(this.props.navigation.state.params.studies.map(st => st.name));
        return this.state.loading ? <Loading/>
            : <Container>
                <Content>
                    <ContactForm
                        contact={this.state.contact}
                        onChange={contact => this.setState({contact})}
                        onSubmit={this.handleSubmit}
                        studies={this.props.navigation.state.params.studies}
                    />
                </Content>
            </Container>;
    }
}

NewContact.propTypes = {
    dispatch: PropTypes.func.isRequired,
    studies: PropTypes.array.isRequired,
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
        setParams: PropTypes.func.isRequired
    }).isRequired
};

export default connect()(NewContact);