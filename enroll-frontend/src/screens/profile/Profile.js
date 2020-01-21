import React, {PureComponent} from 'react';
import {Alert, Button as DefaultButton, TouchableHighlight} from 'react-native';
import {Button, ActionSheet, Container, Content, Footer, Left, List, ListItem, Text, Root} from 'native-base';
import {deleteProfile, signOut} from '../../redux/actions/authentication';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import UTIL_STYLES from '../../styles/common';
import {connect} from 'react-redux';
import {axiosAlert} from '../../utils/axios';
import Loading from '../../components/network/Loading';
import {print} from '../../utils/list';
/*
Avatar / intials
Name, email, phone - profile
site, department - not in front
Disclaimer - big popup text "lorem ipsom"
Contact us - big popup text (email link)
*/
class Profile extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        title: "More",
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          marginLeft: 72,
          marginTop: 15,
        },
        headerStyle: {
          backgroundColor: '#3F51B5',
          height: 70
        },
        headerRight: (() => (
            <TouchableHighlight
                onPress={() => navigation.navigate('EditProfile')}
                style={{ marginTop: 12, marginRight: 12 }}
            >
                <Text style={{ color: '#FFFFFF' }}>Edit Profile</Text>
            </TouchableHighlight>
        ))
    });

    constructor(props) {
        super(props);

        const peers = props.contacts.peers;
        const id = props.profile.id;
        const me = peers.find(c => c.id === id);
        this.siteName = me.site.name;
    }

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

    getProfileInitials = (profile) => {
        const firstNameLetter = profile ? profile.firstName.slice(0, 1) : '';
        const lastNameLetter = profile ? profile.lastName.slice(0, 1) : '';
        return (firstNameLetter + lastNameLetter).toUpperCase();
    }

    render() {
        const {profile, navigation, dispatch} = this.props;
        const firstNameText = profile ? profile.firstName : '';
        const lastNameText = profile ? profile.lastName : '';
        const emailText = profile ? profile.email : '';
        const phoneNumberText = profile ? profile.phoneNumber : '';

        return this.state.loading ? <Loading/>
            : <Root>
                <Container>
                    <Content>
                        <Background>
                            <IntialsContainer>
                                <IntialsText>
                                    {this.getProfileInitials(profile)}
                                </IntialsText>
                            </IntialsContainer>
                            <UserTitle>{firstNameText} {lastNameText}</UserTitle>
                            <List style={ListStyleEnds}>
                                <ListItem style={ListItemStyle}>
                                    <Left>
                                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                                        Email
                                        </Text>
                                    </Left>
                                    <Text>{emailText}</Text>
                                </ListItem>
                                <ListItem style={ListItemStyle}>
                                    <Left>
                                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                                        Phone
                                        </Text>
                                    </Left>
                                    <Text>{phoneNumberText}</Text>
                                </ListItem>
                            </List>
                            <List style={ListStyleMiddle}>
                                <ListItem style={ListItemStyle}>
                                    <Left>
                                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                                        Site
                                        </Text>
                                    </Left>
                                    <Text>{this.siteName}</Text>
                                </ListItem>
                                <ListItem style={ListItemStyle}>
                                    {/* <Left>
                                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                                        Department
                                        </Text>
                                    </Left>
                                    <Text>{phoneNumberText}</Text> */}
                                </ListItem>
                            </List>
                            <List style={ListStyleEnds}>
                                <ListItem style={CenterListItemStyle}>
                                    <Text style={{ alignSelf: 'center' }}>Disclaimer</Text>
                                </ListItem>
                                <ListItem style={CenterListItemStyle}>
                                    <Text>Contact us</Text>
                                </ListItem>
                            </List>
                            <List style={ListStyleEnds}>
                                <TouchableHighlight
                                    style={{ justifyContent: 'center', alignSelf: 'center', height: 40 }}
                                    onPress={() => {
                                        navigation.navigate('SignIn');
                                        dispatch(signOut());
                                    }}
                                >
                                    <Text style={{ color: '#9F0000' }}>
                                        Logout
                                    </Text>
                                </TouchableHighlight>
                            </List>
                        </Background>
                    </Content>
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

const mapStateToProps = ({authentication: {profile}, contacts}) => ({profile, contacts});

export default connect(mapStateToProps)(Profile);

const ListStyleEnds = {
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#FFFFFF'
};

const ListStyleMiddle = {
    marginBottom: 20,
    backgroundColor: '#FFFFFF'
};

const ListItemStyle = {
    height: 32
};

const CenterListItemStyle = {
    height: 32,
    justifyContent: 'center'
};

const Background = styled.View`
    background-color: #EFEFF4;
`;

const IntialsContainer = styled.View`
    background-color: #FFFFFF;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin: 12px;
    margin-top: 30px;
    align-self: center;
    border-color: #B3B3B3;
    border-width: 1px;
`;

const IntialsText = styled.Text`
    font-size: 40px;
    margin: 20px;
    margin-left: 25px;
    color: #3F51B5
`;

const UserTitle = styled.Text`
    font-size: 20px;
    align-self: center;
    color: #787878
`;
