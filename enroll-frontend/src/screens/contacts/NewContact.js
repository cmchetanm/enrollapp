import React, {PureComponent} from 'react';
import {Button} from 'react-native';
import {Container, Content} from 'native-base';
import {createContact} from '../../redux/actions/contacts';
import {axiosAlert} from '../../utils/axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ContactForm from '../../components/contacts/ContactForm';
import Loading from '../../components/network/Loading';

class NewContact extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerRight: <Button onPress={navigation.getParam('handleSubmit')} title='Save'/>
    });

    state = {loading: false, contact: {}};

    componentDidMount() {
        this.props.navigation.setParams({handleSubmit: this.handleSubmit});
    }

    handleSubmit = () => {
        const {dispatch, navigation} = this.props;
        this.setState({loading: true});

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
        return this.state.loading ? <Loading/>
            : <Container>
                <Content>
                    <ContactForm contact={this.state.contact} onChange={contact => this.setState({contact})}
                        onSubmit={this.handleSubmit}/>
                </Content>
            </Container>;
    }
}

NewContact.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
        setParams: PropTypes.func.isRequired
    }).isRequired
};

export default connect()(NewContact);