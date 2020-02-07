import React, {PureComponent} from 'react';
import { ScrollView, Alert, Button as DefaultButton, TouchableOpacity, Linking, Dimensions } from 'react-native';
import {Button, ActionSheet, Container, Content, Footer, Left, List, ListItem, Text, Root} from 'native-base';
import {deleteProfile, signOut} from '../../redux/actions/authentication';
import Dialog, { DialogContent, SlideAnimation, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';
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
          marginLeft: Platform.OS === 'ios' ? -150 : 72,
          marginTop: 15,
        },
        headerStyle: {
          backgroundColor: '#3F51B5',
          height: 70
        },
        headerRight: (() => (
            <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}
                style={{ marginTop: 12, marginRight: 12 }}
            >
                <Text style={{ color: '#FFFFFF' }}>Edit Profile</Text>
            </TouchableOpacity>
        ))
    });

    constructor(props) {
        super(props);
        const id = props.profile.id;
        const myStudy = props.studies.find(st => st.shares.map(sh => sh.user.id).includes(id));
        if (myStudy) {
            const myShare = myStudy.shares.find(sh => sh.user.id === id);
            this.siteName = myShare.site.name;
        } else {
            this.siteName = 'no site';
        }
    }

    state = {loading: false, disclaimerPopupOpen: false, logoutConfirmation: false};

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
    };

    render() {
        const {profile, navigation, dispatch} = this.props;
        const firstNameText = profile ? profile.firstName : '';
        const lastNameText = profile ? profile.lastName : '';
        const emailText = profile ? profile.email : '';
        const phoneNumberText = profile ? profile.phoneNumber : '';
        const maxHeight = Dimensions.get('window').height * 0.6;


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
                            </List>
                            <List style={ListStyleEnds}>
                                <ListItem style={CenterListItemStyle}>
                                    <Text
                                        onPress={() => this.setState({ disclaimerPopupOpen: true })}
                                        style={{ alignSelf: 'center' }}
                                    >
                                        Disclaimer
                                    </Text>
                                </ListItem>
                                <ListItem style={CenterListItemStyle}>
                                    <Text onPress={() => Linking.openURL(`mailto:${'info@refuahsolutions.com'}`)}>Contact us</Text>
                                </ListItem>
                            </List>
                            <List style={ListStyleEnds}>
                                <TouchableOpacity
                                    style={{ justifyContent: 'center', alignSelf: 'center', height: 40 }}
                                    onPress={() => this.setState({ logoutConfirmation: true })}
                                >
                                    <Text style={{ color: '#9F0000' }}>
                                        Logout
                                    </Text>
                                </TouchableOpacity>
                            </List>
                        </Background>
                        <Dialog
                            visible={this.state.disclaimerPopupOpen}
                            dialogAnimation={new SlideAnimation({
                                    slideFrom: 'bottom',
                                })
                            }
                            dialogTitle={<DialogTitle title="Disclaimer" />}
                            footer={
                                <DialogFooter>
                                    <DialogButton
                                        text="OK"
                                        onPress={() => this.setState({ disclaimerPopupOpen: false })}
                                    />
                                </DialogFooter>
                            }
                        >
                            <DialogContent>
                                <ScrollView style={{ maxHeight }}>
                                    <Text>
                                    {'Enroll does not require or advise the inputting of confidential medical patient ' +
                                    'information into the App.\n\nWhen using the App, you agree to abide by all governing ' +
                                    'privacy legislation in your jurisdiction, including but not limited, any laws related ' +
                                    'to the protection of patient information. For clarity, you agree to assume full ' +
                                    'responsibility of your actions to the extent that Refuah Solutions Ltd (the developer ' +
                                    'of Enroll)  is not liable in any way for any privacy breaches that arise as a result ' +
                                    'of your use of the App.\n\nYou further agree to fully indemnify (Refuah), legal costs ' +
                                    'included, from any costs it incurs in the event that you are alleged, in a legal ' +
                                    'proceeding, to have committed a breach of any provision of such applicable legislation ' +
                                    'or in law as a result of your use of the App.'}
                                    </Text>
                                </ScrollView>
                            </DialogContent>
                        </Dialog>
                        <Dialog
                            visible={this.state.logoutConfirmation}
                            dialogAnimation={new SlideAnimation({
                                    slideFrom: 'bottom',
                                })
                            }
                            dialogTitle={<DialogTitle title="Logout" />}
                            footer={
                                <DialogFooter>
                                    <DialogButton
                                        text="Yes"
                                        onPress={() => {
                                            this.setState({ logoutConfirmation: false });
                                            setTimeout(() => {
                                                navigation.navigate('SignIn');
                                                dispatch(signOut());
                                            }, 500);
                                        }}
                                    />
                                    <DialogButton
                                        text="No"
                                        onPress={() => this.setState({ logoutConfirmation: false })}
                                    />
                                </DialogFooter>
                            }
                        >
                            <DialogContent>
                                <Text>
                                {'Are you sure you want to logout?'}
                                </Text>
                            </DialogContent>
                        </Dialog>
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

const mapStateToProps = ({authentication: {profile}, contacts, studies: {list}}) => ({profile, contacts, studies: list});

export default connect(mapStateToProps)(Profile);

const ListStyleEnds = {
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#FFFFFF'
};

const ListStyleMiddle = {
    marginBottom: Platform.OS === 'ios' ? 70 : 52,
    backgroundColor: '#FFFFFF'
};

const ListItemStyle = {
    height: Platform.OS === 'ios' ? 50 : 32,
};

const CenterListItemStyle = {
    height: Platform.OS === 'ios' ? 50 : 32,
    justifyContent: 'center'
};

const Background = styled.View`
    background-color: #EFEFF4;
`;

const IntialsContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
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
    color: #3F51B5
`;

const UserTitle = styled.Text`
    font-size: 20px;
    align-self: center;
    color: #787878
`;
