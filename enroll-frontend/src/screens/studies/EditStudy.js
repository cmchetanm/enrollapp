import React, {PureComponent} from 'react';
import {Button as DefaultButton} from 'react-native';
import {ActionSheet, Button, Container, Content, Footer, Root, Text} from 'native-base';
import {resetStudy, updateStudy} from '../../redux/actions/studies';
import {axiosAlert} from '../../utils/axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import StudyForm from '../../components/studies/StudyForm';
import Loading from '../../components/network/Loading';

class EditStudy extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerLeft: <DefaultButton onPress={() => navigation.goBack()} title='Cancel'/>,
        headerRight: <DefaultButton onPress={() => navigation.getParam('handleSubmit')()} title='Save'/>
    });

    state = {loading: false, study: this.props.navigation.state.params.study};

    componentDidMount() {
        this.props.navigation.setParams({handleSubmit: this.handleSubmit});
    }

    handleSubmit = () => {
        this.setState({loading: true});
        this.props.dispatch(updateStudy(this.state.study)).then(response => {
            this.setState({loading: false});

            if (response.error) {
                axiosAlert('Unable to update study.', response.error);
            }
            else {
                this.props.navigation.navigate('Study', {study: this.state.study});
            }
        });
    };

    resetStudy = () => {
        const {dispatch, navigation} = this.props;
        this.setState({loading: true});
        dispatch(resetStudy(this.state.study)).then(response => {
            this.setState({loading: false});

            if (response.error) {
                axiosAlert('Unable to reset study.', response.error);
            }
            else {
                navigation.navigate('Dashboard');
            }
        });
    };

    updateStudy = study => {
        this.setState(() => ({
            study: study
        }));
    };

    render() {
        return this.state.loading ? <Loading/>
            : <Root>
                <Container>
                    <Content>
                        <StudyForm
                            onChange={study => this.updateStudy(study)}
                            onSubmit={this.handleSubmit}
                            study={this.state.study}
                            topic={this.state.study.topic}
                        />
                    </Content>
                    <Footer>
                        <Button block danger onPress={() =>
                            ActionSheet.show({
                                options: ['Cancel', 'Reset Study'],
                                cancelButtonIndex: 0,
                                destructiveButtonIndex: 1
                            },
                            buttonIndex => {
                                if (buttonIndex === 1) {
                                    this.resetStudy();
                                }
                            })} transparent>
                            <Text>Restore Original Version</Text>
                        </Button>
                    </Footer>
                </Container>
            </Root>;
    }
}

EditStudy.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        setParams: PropTypes.func.isRequired,
        state: PropTypes.shape({
            params: PropTypes.shape({
                study: PropTypes.object.isRequired
            })
        })
    }).isRequired
};

const mapStateToProps = ({studies: {study}}) => ({study});

export default connect(mapStateToProps)(EditStudy);