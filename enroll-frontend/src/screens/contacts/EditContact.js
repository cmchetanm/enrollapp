import React, {PureComponent} from 'react';
import {Button as DefaultButton} from 'react-native';
import {Container, Content} from 'native-base';
import {updateContact} from '../../redux/actions/contacts';
import {axiosAlert} from '../../utils/axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ContactForm from '../../components/contacts/ContactForm';
import Loading from '../../components/network/Loading';

class EditContact extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerLeft:
            <DefaultButton
                onPress={() => navigation.navigate('Contact', {contact: navigation.state.params.contact})}
                title='Cancel'
            />,
        headerRight:
            <DefaultButton
                onPress={navigation.getParam('handleSubmit')}
                title='Save'
            />

    });

    state = {loading: false, contact: this.props.navigation.state.params.contact};

    componentDidMount() {
        this.props.navigation.setParams({handleSubmit: this.handleSubmit});
    }

    handleSubmit = () => {
        const {contact} = this.state;
        this.setState({loading: true});
        this.props.dispatch(updateContact(contact)).then(response => {
            this.setState({loading: false});

            if (response.error) {
                axiosAlert('Unable to update contact.', response.error);
            }
            else {
                this.props.navigation.navigate('Contact', {contact});
            }
        });
    };

    render() {
        return this.state.loading ? <Loading/>
            : <Container>
                <Content>
                    <ContactForm contact={this.state.contact} onChange={contact => this.setState({contact})}
                        onSubmit={this.handleSubmit}/>
                </Content>
            </Container>;
    }
}

EditContact.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        setParams: PropTypes.func.isRequired,
        state: PropTypes.shape({
            params: PropTypes.shape({
                contact: PropTypes.object.isRequired
            })
        })
    }).isRequired
};

export default connect()(EditContact);