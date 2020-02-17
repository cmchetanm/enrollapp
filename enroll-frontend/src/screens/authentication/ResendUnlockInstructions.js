import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Alert, SafeAreaView} from 'react-native';
import {Button, Content, Form, H1, Input, Item, Text} from 'native-base';
import {connect} from 'react-redux';
import {resendUnlockInstructions} from '../../redux/actions/authentication';
import {axiosAlert} from '../../utils/axios';
import UTIL_STYLES from '../../styles/common';

class ResendUnlockInstructions extends PureComponent {
    state = {email: null, loading: false};

    handleResendUnlockInstructionsRequest = () => {
        const {dispatch, navigation} = this.props;
        this.setState({loading: true});
        dispatch(resendUnlockInstructions(this.state.email)).then(response => {
            this.setState({loading: false});

            if (response.error) {
                axiosAlert('Authentication Failed', response.error);
            }
            else {
                navigation.goBack();
                Alert.alert('Unlock Instructions Sent',
                    'A message with the unlock instructions has been sent to your email address. ' +
                    'Please follow the link to activate your account.');
            }
        });
    }

    render() {
        const {navigation} = this.props;
        const {email, loading} = this.state;
        return (
            <SafeAreaView style={UTIL_STYLES.ALIGN_MIDDLE}>
                <Content contentContainerStyle={UTIL_STYLES.ALIGN_MIDDLE} padder>
                    <Form>
                        <H1 style={UTIL_STYLES.TEXT_CENTER}>Unlock Instructions</H1>
                        <Item>
                            <Input
                                autoCapitalize='none'
                                blurOnSubmit
                                keyboardType='email-address'
                                onChangeText={text =>
                                    this.setState({email: text})
                                }
                                onSubmitEditing={this.handleResendUnlockInstructionsRequest}
                                placeholder='Email'
                                returnKeyType='done'
                                value={email}
                            />
                        </Item>
                        <Button
                            block
                            disabled={loading}
                            onPress={this.handleResendUnlockInstructionsRequest}
                            style={{marginTop: 16}}
                            success
                        >
                            <Text>Resend Email</Text>
                        </Button>
                        <Button block onPress={() => navigation.goBack()} transparent>
                            <Text>Sign In</Text>
                        </Button>
                    </Form>
                </Content>
            </SafeAreaView>
        );
    }
}

ResendUnlockInstructions.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired
    }).isRequired
};

export default connect()(ResendUnlockInstructions);