import React, {PureComponent} from 'react';
import {Button} from 'react-native';
import {Container, Content} from 'native-base';
import {createStudy} from '../../redux/actions/studies';
import {axiosAlert} from '../../utils/axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import StudyForm from '../../components/studies/StudyForm';
import Loading from '../../components/network/Loading';

class NewStudy extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerRight:
            <Button
                onPress={navigation.getParam('handleSubmit')}
                title='Save'
            />

    });

    state = {loading: false, topic: this.props.navigation.state.params.topic, study: {}};

    componentDidMount() {
        this.props.navigation.setParams({handleSubmit: this.handleSubmit});
    }

    handleSubmit = () => {
        this.setState({loading: true});
        this.props.dispatch(createStudy(this.state.topic, this.state.study)).then(response => {
            this.setState({loading: false});

            if (response.error) {
                axiosAlert('Unable to create study.', response.error);
            }
            else {
                this.props.navigation.navigate('Studies');
            }
        });
    };

    updateStudy = study => {
        this.setState(() => ({
            study: study
        }));
    }

    render() {
        return this.state.loading ? <Loading/>
            : <Container>
                <Content>
                    <StudyForm
                        onChange={study => this.updateStudy(study)}
                        onSubmit={this.handleSubmit}
                        study={this.state.study}
                        topic={this.state.topic}
                    />
                </Content>
            </Container>;
    }
}

NewStudy.propTypes = {
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

export default connect()(NewStudy);