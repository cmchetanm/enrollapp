import React, {PureComponent} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {Button, Content, Form, H1, Input, Item, Label, Text} from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {signUp} from '../../redux/actions/authentication';
import UTIL_STYLES from '../../styles/common';
import {axiosAlert} from '../../utils/axios';
import Loading from '../../components/network/Loading';

class SignUp extends PureComponent {
    constructor(props) {
        super(props);

        this.inputs = {};
    }

    state = {
        loading: false,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        email: null,
        password: null
    };

    handleSubmit = () => {
        const {dispatch, navigation} = this.props;
        this.setState({loading: true});
        dispatch(signUp(this.state)).then(response => {
            this.setState({loading: false});

            if (response.error) {
                axiosAlert('Account Creation Failed', response.error);
            }
            else {
                navigation.goBack();
                Alert.alert('Account Created',
                    'A message with a confirmation link has been sent to your email address. ' +
                    'Please follow the link to activate your account.');
            }
        });
    };

    focusNextField = id => {
        this.inputs[id]._root.focus();
    }

    render() {
        const {loading, firstName, lastName, phoneNumber, email, password} = this.state;
        return (
            <SafeAreaView style={UTIL_STYLES.ALIGN_MIDDLE}>
                <Content contentContainerStyle={UTIL_STYLES.ALIGN_MIDDLE} padder>
                    {loading ? <Loading/>
                        : <Form>
                            <H1 style={UTIL_STYLES.TEXT_CENTER}>One Time Registration</H1>
                            <Item stackedLabel>
                                <Label>First Name</Label>
                                <Input autoCorrect={false}
                                    blurOnSubmit={false}
                                    onChangeText={text => this.setState({firstName: text})}
                                    onSubmitEditing={() => this.focusNextField('lastName')} ref={input => {
                                        this.inputs.firstName = input;
                                    }} returnKeyType='next' value={firstName}/>
                            </Item>
                            <Item stackedLabel>
                                <Label>Last Name</Label>
                                <Input autoCorrect={false}
                                    blurOnSubmit={false}
                                    onChangeText={text => this.setState({lastName: text})}
                                    onSubmitEditing={() => this.focusNextField('email')}
                                    ref={input => {
                                        this.inputs.lastName = input;
                                    }}
                                    returnKeyType='next'
                                    value={lastName}/>
                            </Item>
                            <Item stackedLabel>
                                <Label>Email</Label>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    blurOnSubmit={false}
                                    keyboardType='email-address'
                                    onChangeText={text => this.setState({email: text})}
                                    onSubmitEditing={() => this.focusNextField('password')}
                                    ref={input => {
                                        this.inputs.email = input;
                                    }}
                                    returnKeyType='next'
                                    value={email}
                                />
                            </Item>
                            <Item stackedLabel>
                                <Label>Password</Label>
                                <Input
                                    blurOnSubmit
                                    onChangeText={text => this.setState({password: text})}
                                    onSubmitEditing={() => this.focusNextField('phoneNumber')}
                                    ref={input => {
                                        this.inputs.password = input;
                                    }}
                                    returnKeyType='next'
                                    secureTextEntry
                                    value={password}
                                />
                            </Item>
                            <Item stackedLabel>
                                <Label>Mobile Phone</Label>
                                <Input
                                    autoCapitalize='none'
                                    blurOnSubmit
                                    keyboardType='phone-pad'
                                    onChangeText={text => this.setState({phoneNumber: text})}
                                    onSubmitEditing={() => this.handleSubmit()}
                                    ref={input => {
                                        this.inputs.phoneNumber = input;
                                    }}
                                    returnKeyType='done'
                                    value={phoneNumber}
                                />
                            </Item>
                            <Button block onPress={this.handleSubmit} success>
                                <Text>Create Account</Text>
                            </Button>
                            <Button block onPress={() => this.props.navigation.goBack()} transparent>
                                <Text>Already have an account? Sign In</Text>
                            </Button>
                        </Form>
                    }
                </Content>
            </SafeAreaView>
        );
    }
}

SignUp.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired
    }).isRequired
};

export default connect()(SignUp);