import React, {PureComponent} from 'react';
import {Button as DefaultButton, TouchableOpacity} from 'react-native';
import {ActionSheet, Button, Container, Content, Footer, Root, Text} from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ContactView from '../../components/contacts/ContactView';
import {deleteContact} from '../../redux/actions/contacts';
import Loading from '../../components/network/Loading';
import {axiosAlert} from '../../utils/axios';
import { print } from '../../utils/list';

class Contact extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.contact.fullName,
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          marginLeft: 15,
          marginTop: 15,
        },
        headerStyle: {
          backgroundColor: '#3F51B5',
          height: 70
        }
    });

    state = {loading: false};

    deleteContact = contact => {
        const {dispatch, navigation} = this.props;
        this.setState({loading: true});
        dispatch(deleteContact(contact)).then(response => {
            this.setState({loading: false});

            if (response.error) {
                axiosAlert('Unable to delete contact.', response.error);
            }
            else {
                navigation.goBack();
            }
        });
    };

    render() {
        const {contact} = this.props;
        return this.state.loading || !contact ? <Loading/>
            : <Root>
                <Container>
                    <Content>
                        <ContactView contact={contact}/>
                    </Content>
                </Container>
            </Root>;
    }
}

Contact.propTypes = {
    contact: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        state: PropTypes.shape({
            params: PropTypes.shape({
                contact: PropTypes.object.isRequired
            })
        })
    }).isRequired
};

const mapStateToProps = ({contacts}, ownProps) => {
    const contact = contacts.peers.find(contact => contact.id === ownProps.navigation.state.params.contact.id);
    return ({contact});
};

export default connect(mapStateToProps)(Contact);