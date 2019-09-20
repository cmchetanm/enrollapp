import React, {PureComponent} from 'react';
import {SafeAreaView} from 'react-native';
import {Body, Button, Content, Form, H1, Icon, Input, Item, Left, ListItem, Text} from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {signIn} from '../../redux/actions/authentication';
import UTIL_STYLES from '../../styles/common';
import {axiosAlert} from '../../utils/axios';
import Loading from '../../components/network/Loading';
import commonColor from '../../theme/variables/commonColor';
import Logo from '../../components/Logo';

class SignIn extends PureComponent {
    state = {email: null, loading: false, password: null, recontactMe: true};

    inputs = {};

    handleSubmit = () => {
        const {dispatch, navigation} = this.props;
        this.setState({loading: true});
        dispatch(signIn(this.state)).then(response => {
            this.setState({loading: false});

            if (response.error) {
                axiosAlert('Authentication Failed', response.error);
            }
            else {
                navigation.navigate('AppSwitch', {initialRoute: 'Dashboard'});
            }
        });
    };

    focusNextField = id => {
        this.inputs[id]._root.focus();
    };

    render() {
        const {email, loading, password, recontactMe} = this.state;
        return (
            <SafeAreaView style={UTIL_STYLES.ALIGN_MIDDLE}>
                <Content contentContainerStyle={UTIL_STYLES.ALIGN_MIDDLE} padder>
                    {loading ? <Loading/>
                        : <Form>
                            <Logo/>
                            <H1 style={UTIL_STYLES.TEXT_CENTER}>Sign In</H1>
                            <Item>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    blurOnSubmit={false}
                                    keyboardType='email-address'
                                    onChangeText={text =>
                                        this.setState({email: text})
                                    }
                                    onSubmitEditing={() => this.focusNextField('password')}
                                    placeholder='Email'
                                    ref={input => {
                                        this.inputs.email = input;
                                    }}
                                    returnKeyType='next'
                                    value={email}
                                />
                            </Item>
                            <Item>
                                <Input
                                    blurOnSubmit
                                    onChangeText={text =>
                                        this.setState({password: text})
                                    }
                                    onSubmitEditing={this.handleSubmit}
                                    placeholder='Password'
                                    ref={input => {
                                        this.inputs.password = input;
                                    }}
                                    returnKeyType='done'
                                    secureTextEntry
                                    value={password}
                                />
                            </Item>
                            <ListItem icon noBorder onPress={() => this.setState({recontactMe: !recontactMe})}>
                                <Left>
                                    <Icon name={recontactMe ? 'checkmark-circle' : 'radio-button-off'}
                                        style={{color: commonColor.brandPrimary}}/>
                                </Left>
                                <Body><Text>Keep me signed in</Text></Body>
                            </ListItem>
                            <Button
                                onPress={() =>
                                    this.props.navigation.navigate('ForgotPassword')
                                }
                                small
                                style={UTIL_STYLES.MARGIN_BOTTOM}
                                transparent
                            >
                                <Text>Forgot your password? Reset</Text>
                            </Button>
                            <Button
                                block
                                onPress={this.handleSubmit}
                                style={UTIL_STYLES.MARGIN_BOTTOM}
                                success
                            >
                                <Text>Sign In</Text>
                            </Button>
                            {/* <Button*/}
                            {/*    block*/}
                            {/*    light*/}
                            {/*    onPress={() => {*/}
                            {/*        this.props.navigation.navigate('SignUp');*/}
                            {/*    }}*/}
                            {/*    style={UTIL_STYLES.MARGIN_BOTTOM}*/}
                            {/* >*/}
                            {/*    <Text>Sign Up for an Account</Text>*/}
                            {/* </Button>*/}
                            <Button
                                block
                                onPress={() =>
                                    this.props.navigation.navigate('ResendUnlockInstructions')
                                }
                                transparent
                            >
                                <Text>Account locked? Unlock</Text>
                            </Button>
                            {/* <Button*/}
                            {/*    block*/}
                            {/*    onPress={() => {*/}
                            {/*        this.props.navigation.navigate('ResendConfirmEmail');*/}
                            {/*    }}*/}
                            {/*    transparent*/}
                            {/* >*/}
                            {/*    <Text>No confirmation email? Resend</Text>*/}
                            {/* </Button>*/}
                        </Form>
                    }
                </Content>
            </SafeAreaView>
        );
    }
}

SignIn.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};

export default connect()(SignIn);