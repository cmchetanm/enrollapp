import React, {PureComponent} from 'react';
import {Button as DefaultButton} from 'react-native';
import {ActionSheet, Button, Container, Content, Footer, Root, Text} from 'native-base';
import {deleteTopic, updateTopic} from '../../redux/actions/topics';
import {axiosAlert} from '../../utils/axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TopicForm from '../../components/topics/TopicForm';
import Loading from '../../components/network/Loading';

class EditTopic extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerLeft:
            <DefaultButton
                onPress={() => navigation.navigate('Studies', {topic: navigation.state.params.topic})}
                title='Cancel'
            />,
        headerRight:
            <DefaultButton
                onPress={navigation.getParam('handleSubmit')}
                title='Save'
            />

    });

    state = {loading: false, topic: this.props.navigation.state.params.topic};

    componentDidMount() {
        this.props.navigation.setParams({handleSubmit: this.handleSubmit});
    }

    handleSubmit = () => {
        const {dispatch, navigation} = this.props;
        this.setState({loading: true});
        dispatch(updateTopic(this.state.topic)).then(response => {
            this.setState({loading: false});

            if (response.error) {
                axiosAlert('Unable to update topic.', response.error);
            }
            else {
                navigation.navigate('Studies', {topic: this.state.topic});
            }
        });
    };

    deleteTopic = () => {
        const {dispatch, navigation} = this.props;
        this.setState({loading: true});
        dispatch(deleteTopic(this.state.topic)).then(response => {
            this.setState({loading: false});

            if (response.error) {
                axiosAlert('Unable to update topic.', response.error);
            }
            else {
                navigation.navigate('Topics');
            }
        });
    };

    render() {
        return this.state.loading ? <Loading/>
            : <Root>
                <Container>
                    <Content>
                        <TopicForm onChange={topic => this.setState({topic})} onSubmit={this.handleSubmit}
                            topic={this.state.topic}/>
                    </Content>
                    <Footer>
                        <Button block danger onPress={() =>
                            ActionSheet.show({
                                options: ['Cancel', 'Delete Topic'],
                                cancelButtonIndex: 0,
                                destructiveButtonIndex: 1
                            },
                            buttonIndex => {
                                if (buttonIndex === 1) {
                                    this.deleteTopic();
                                }
                            })} transparent>
                            <Text>Delete Topic</Text>
                        </Button>
                    </Footer>
                </Container>
            </Root>;
    }
}

EditTopic.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        setParams: PropTypes.func.isRequired,
        state: PropTypes.shape({
            params: PropTypes.shape({
                topic: PropTypes.object.isRequired
            })
        })
    }).isRequired
};

export default connect()(EditTopic);
