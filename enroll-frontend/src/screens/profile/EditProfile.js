import React, {PureComponent} from 'react';
import {Button as DefaultButton} from 'react-native';
import {Container, Content} from 'native-base';
import {updateProfile} from '../../redux/actions/authentication';
import {axiosAlert} from '../../utils/axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProfileForm from '../../components/profile/ProfileForm';
import Loading from '../../components/network/Loading';

class EditProfile extends PureComponent {
    static navigationOptions = ({profile, navigation}) => ({
        headerLeft:
            <DefaultButton
                onPress={() => navigation.navigate('Profile', {profile})}
                title='Cancel'
            />,
        headerRight:
            <DefaultButton
                onPress={navigation.getParam('handleSubmit')}
                title='Save'
            />

    });

    state = {loading: false, profile: this.props.profile};

    componentDidMount() {
        this.props.navigation.setParams({handleSubmit: this.handleSubmit});
    }

    handleSubmit = () => {
        const {dispatch, navigation} = this.props;
        this.setState({loading: true});
        dispatch(updateProfile(this.state.profile)).then(response => {
            this.setState({loading: false});

            if (response.error) {
                axiosAlert('Unable to update profile.', response.error);
            }
            else {
                navigation.navigate('Profile');
            }
        });
    };

    render() {
        return this.state.loading ? <Loading/>
            : <Container>
                <Content>
                    <ProfileForm onChange={profile => this.setState({profile})} onSubmit={this.handleSubmit}
                        profile={this.state.profile}/>
                </Content>
            </Container>;
    }
}

EditProfile.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        setParams: PropTypes.func.isRequired
    }).isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = ({authentication: {profile}}) => ({profile});

export default connect(mapStateToProps)(EditProfile);