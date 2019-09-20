import React, {PureComponent} from 'react';
import {Button as DefaultButton} from 'react-native';
import {ActionSheet, Button, Container, Content, Footer, Root, Text} from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ContactView from '../../components/contacts/ContactView';
import {deleteContact} from '../../redux/actions/contacts';
import Loading from '../../components/network/Loading';
import {axiosAlert} from '../../utils/axios';

class Contact extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.contact.fullName,
        headerRight:
            <DefaultButton
                onPress={() => navigation.navigate('EditContact', {contact: navigation.state.params.contact})}
                title='Edit'
            />

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
                <Footer>
                    <Button block danger onPress={() =>
                        ActionSheet.show({
                            options: ['Cancel', 'Delete Contact'],
                            cancelButtonIndex: 0,
                            destructiveButtonIndex: 1
                        },
                        buttonIndex => {
                            if (buttonIndex === 1) {
                                this.deleteContact(contact);
                            }
                        })} transparent>
                        <Text>Delete Contact</Text>
                    </Button>
                </Footer>
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

const mapStateToProps = ({contacts}, ownProps) => ({
    contact: contacts.list.find(contact => contact.id === ownProps.navigation.state.params.contact.id)
});

export default connect(mapStateToProps)(Contact);