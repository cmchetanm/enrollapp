import React, {PureComponent} from 'react';
import {SafeAreaView} from 'react-native';
import {Body, Button, Content, Form, H1, H3, Icon, Input, Item, Left, ListItem, Text} from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {signIn} from '../../redux/actions/authentication';
import UTIL_STYLES from '../../styles/common';
import {axiosAlert} from '../../utils/axios';
import Loading from '../../components/network/Loading';
import commonColor from '../../theme/variables/commonColor';
import Logo from '../../components/Logo';

class SignIn extends PureComponent {
    state = {stage: 'email', email: null, loading: false, password: null, recontactMe: true};

    inputs = {};

    handleSubmit = (pw) => {
        const {dispatch, navigation} = this.props;
        this.setState({loading: true});
        if (pw) {
            dispatch(signIn(this.state)).then(response => {
                this.setState({loading: false});
    
                if (response.error) {
                    axiosAlert('Authentication Failed', response.error);
                }
                else {
                    navigation.navigate('AppSwitch', {initialRoute: 'Dashboard'});
                }
            });
        } else {
            this.setState({loading: false, stage: 'password'});
        }
    };

    // focusNextField = id => {
    //     this.inputs[id]._root.focus();
    // };

    render() {
        const {stage, email, loading, password, recontactMe} = this.state;
        const pw = stage === 'password';
        const buttonText = pw ? 'Sign In' : 'Submit';
        return (
            <SafeAreaView style={UTIL_STYLES.ALIGN_MIDDLE}>
                <Content contentContainerStyle={UTIL_STYLES.ALIGN_MIDDLE} padder>
                    {loading ? <Loading/>
                        : <Form>
                            <Logo/>
                            <H1 style={{margin: 20, textAlign: 'center'}}>Sign In</H1>
                            {pw && <H3 style={{ alignSelf: 'center', margin: 10 }}>{email}</H3>}
                            <Item>
                                {pw ? <Input
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
                                /> : <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    blurOnSubmit={false}
                                    keyboardType='email-address'
                                    onChangeText={text =>
                                        this.setState({email: text})
                                    }
                                    onSubmitEditing={() => console.log('should focus next maybe "password"')}
                                    placeholder='Please Enter Your Email Address'
                                    ref={input => {
                                        this.inputs.email = input;
                                    }}
                                    returnKeyType='next'
                                    value={email}
                                />}
                            </Item>
                            {pw && <ListItem icon noBorder onPress={() => this.setState({recontactMe: !recontactMe})}>
                                <Left>
                                    <Icon name={recontactMe ? 'checkmark-circle' : 'radio-button-off'}
                                        style={{color: commonColor.brandPrimary}}/>
                                </Left>
                                <Body><Text>Keep me signed in</Text></Body>
                            </ListItem>}
                            {pw && <Button
                                onPress={() =>
                                    this.setState({ stage: 'email' })
                                }
                                small
                                style={UTIL_STYLES.MARGIN_BOTTOM}
                                transparent
                            >
                                <Text>Login with a different email</Text>
                            </Button>}
                            {pw && <Button
                                onPress={() =>
                                    this.props.navigation.navigate('ForgotPassword')
                                }
                                small
                                style={UTIL_STYLES.MARGIN_BOTTOM}
                                transparent
                            >
                                <Text>Forgot your password? Reset</Text>
                            </Button>}
                            <Button
                                block
                                onPress={() => this.handleSubmit(pw)}
                                style={UTIL_STYLES.MARGIN_BOTTOM, { marginTop: pw ? 0 : 100 }}
                                success
                            >
                                <Text>{buttonText}</Text>
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
                            {/* {pw && <Button
                                block
                                onPress={() =>
                                    this.props.navigation.navigate('ResendUnlockInstructions')
                                }
                                transparent
                            >
                                <Text>Account locked? Unlock</Text>
                            </Button>} */}
 
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