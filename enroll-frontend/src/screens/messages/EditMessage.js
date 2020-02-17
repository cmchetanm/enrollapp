import React, {PureComponent} from 'react';
import {Button as DefaultButton} from 'react-native';
import {Container, Content} from 'native-base';
import {updateMessage} from '../../redux/actions/messages';
import {axiosAlert} from '../../utils/axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MessageForm from '../../components/messages/MessageForm';
import Loading from '../../components/network/Loading';

class EditMessage extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerLeft:
            <DefaultButton
                onPress={() => navigation.navigate('Message', {message: navigation.state.params.message})}
                title='Cancel'
            />,
        headerRight:
            <DefaultButton
                onPress={navigation.getParam('handleSubmit')}
                title='Save'
            />

    });

    state = {loading: false, message: this.props.navigation.state.params.message};

    componentDidMount() {
        this.props.navigation.setParams({handleSubmit: this.handleSubmit});
    }

    handleSubmit = () => {
        const {message} = this.state;
        this.setState({loading: true});
        this.props.dispatch(updateMessage(message.id, message.text)).then(response => {
            this.setState({loading: false});

            if (response.error) {
                axiosAlert('Unable to update message.', response.error);
            }
            else {
                this.props.navigation.navigate('Message', {message});
            }
        });
    };

    render() {
        return this.state.loading ? <Loading/>
            : <Container>
                <Content>
                    <MessageForm message={this.state.message} onChange={message => this.setState({message})}
                        onSubmit={this.handleSubmit}/>
                </Content>
            </Container>;
    }
}

EditMessage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        setParams: PropTypes.func.isRequired,
        state: PropTypes.shape({
            params: PropTypes.shape({
                message: PropTypes.object.isRequired
            })
        })
    }).isRequired
};

export default connect()(EditMessage);