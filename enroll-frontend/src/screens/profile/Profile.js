import React, {PureComponent} from 'react';
import {Alert, Button as DefaultButton} from 'react-native';
import {Button, ActionSheet, Container, Content, Footer, Left, List, ListItem, Text, Root} from 'native-base';
import {deleteProfile} from '../../redux/actions/authentication';
import PropTypes from 'prop-types';
import UTIL_STYLES from '../../styles/common';
import {connect} from 'react-redux';
import {axiosAlert} from '../../utils/axios';
import Loading from '../../components/network/Loading';

class Profile extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerRight: <DefaultButton onPress={() => navigation.navigate('EditProfile')} title='Edit Profile'/>
    });

    state = {loading: false};

    deleteAccount = () => {
        const {dispatch, navigation} = this.props;
        this.setState({loading: true});
        dispatch(deleteProfile()).then(response => {
            if (response.error) {
                this.setState({loading: false});
                axiosAlert('Unable to delete account.', response.error);
            }
            else {
                navigation.navigate('SignIn');
                Alert.alert('Account Deleted',
                    'Your account and all of the associated user data have been successfully deleted.');
            }
        });
    };

    render() {
        const {profile} = this.props;
        return this.state.loading ? <Loading/>
            : <Root>
                <Container>
                    <Content>
                        <List>
                            <ListItem>
                                <Left>
                                    <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                                    Full Name
                                    </Text>
                                </Left>
                                <Text>{profile.firstName} {profile.lastName}</Text>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                                    Email
                                    </Text>
                                </Left>
                                <Text>{profile.email}</Text>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                                    Phone
                                    </Text>
                                </Left>
                                <Text>{profile.phoneNumber}</Text>
                            </ListItem>
                        </List>
                    </Content>
                    <Footer>
                        <Button block danger onPress={() =>
                            ActionSheet.show({
                                options: ['Cancel', 'Delete Account'],
                                cancelButtonIndex: 0,
                                destructiveButtonIndex: 1
                            },
                            buttonIndex => {
                                if (buttonIndex === 1) {
                                    this.deleteAccount();
                                }
                            })} transparent>
                            <Text>Delete Account</Text>
                        </Button>
                    </Footer>
                </Container>
            </Root>;
    }
}

Profile.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = ({authentication: {profile}}) => ({profile});

export default connect(mapStateToProps)(Profile);