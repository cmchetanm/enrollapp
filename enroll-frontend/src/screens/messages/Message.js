import React, {PureComponent} from 'react';
import {Button as DefaultButton, TouchableOpacity} from 'react-native';
import {ActionSheet, Button, Container, Content, Footer, Root, Text} from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteMessage} from '../../redux/actions/messages';
import Loading from '../../components/network/Loading';
import {axiosAlert} from '../../utils/axios';
import MessageView from '../../components/messages/MessageView';

class Message extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        title: "Message",
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          marginLeft: Platform.OS === 'ios' ? -150 : 72,
          marginTop: 15,
        },
        headerStyle: {
          backgroundColor: '#3F51B5',
          height: 70
        },
        headerRight: navigation.getParam('profile') &&
        navigation.state.params.message.userId === navigation.getParam('profile').id && (() => (
            <TouchableOpacity
                onPress={() => navigation.navigate('EditMessage')}
                style={{ marginTop: 12, marginRight: 12 }}
            >
                <Text style={{ color: '#FFFFFF' }}>Edit</Text>
            </TouchableOpacity>
        ))
    });    
    static getDerivedStateFromProps(nextProps) {
        const nextMessage = nextProps.navigation.state.params.message;
        return {message: {...nextMessage}};
    }

    state = {message: this.props.navigation.state.params.message, loading: false};

    componentDidMount() {
        this.props.navigation.setParams({profile: this.props.profile});
    }

    deleteMessage = message => {
        const {dispatch, navigation} = this.props;
        this.setState({loading: true});
        dispatch(deleteMessage(message.id)).then(response => {
            this.setState({loading: false});

            if (response.error) {
                axiosAlert('Unable to delete message.', response.error);
            }
            else {
                navigation.goBack();
            }
        });
    };

    render() {
        const {message} = this.state;
        return this.state.loading ? <Loading/>
            : <Root>
                <Container>
                    <Content>
                        <MessageView message={message}/>
                    </Content>
                </Container>
                {message.userId === this.props.profile.id && <Footer>
                    <Button block onPress={() =>
                        ActionSheet.show({
                            options: ['Cancel', 'Delete Message'],
                            cancelButtonIndex: 0,
                            destructiveButtonIndex: 1
                        },
                        buttonIndex => {
                            if (buttonIndex === 1) {
                                this.deleteMessage(message);
                            }
                        })} transparent>
                        <Text>Delete Message</Text>
                    </Button>
                </Footer>}
            </Root>;
    }
}

Message.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        setParams: PropTypes.func.isRequired,
        state: PropTypes.shape({
            params: PropTypes.shape({
                message: PropTypes.object.isRequired
            })
        })
    }).isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = ({authentication: {profile}}) => ({profile});

export default connect(mapStateToProps)(Message);