import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Alert, SafeAreaView} from 'react-native';
import {Button, Content, Form, H1, Input, Item, Text} from 'native-base';
import {connect} from 'react-redux';
import {resendConfirmEmailLink} from '../../redux/actions/authentication';
import {axiosAlert} from '../../utils/axios';
import UTIL_STYLES from '../../styles/common';

class ResendConfirmEmail extends PureComponent {
    state = {email: null, loading: false};

    handleResendConfirmEmailLinkRequest = () => {
        const {dispatch, navigation} = this.props;
        this.setState({loading: true});
        dispatch(resendConfirmEmailLink(this.state.email)).then(response => {
            this.setState({loading: false});

            if (response.error) {
                axiosAlert('Authentication Failed', response.error);
            }
            else {
                navigation.goBack();
                Alert.alert('Confirm Email Link Sent',
                    'A message with a confirmation link has been sent to your email address. ' +
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
                        <H1 style={UTIL_STYLES.TEXT_CENTER}>Confirmation Email</H1>
                        <Item>
                            <Input
                                autoCapitalize='none'
                                blurOnSubmit
                                keyboardType='email-address'
                                onChangeText={text =>
                                    this.setState({email: text})
                                }
                                onSubmitEditing={this.handleResendConfirmEmailLinkRequest}
                                placeholder='Email'
                                returnKeyType='done'
                                value={email}
                            />
                        </Item>
                        <Button
                            block
                            disabled={loading}
                            onPress={this.handleResendConfirmEmailLinkRequest}
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

ResendConfirmEmail.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired
    }).isRequired
};

export default connect()(ResendConfirmEmail);