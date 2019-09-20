import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Alert, SafeAreaView} from 'react-native';
import {Button, Content, Form, H1, Input, Item, Text} from 'native-base';
import {connect} from 'react-redux';
import get from 'lodash/get';
import {sendResetPasswordLink} from '../../redux/actions/authentication';
import {axiosAlert} from '../../utils/axios';
import UTIL_STYLES from '../../styles/common';

const ForgotPassword = ({dispatch, navigation}) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    return (
        <SafeAreaView style={UTIL_STYLES.ALIGN_MIDDLE}>
            <Content contentContainerStyle={UTIL_STYLES.ALIGN_MIDDLE} padder>
                <Form>
                    <H1 style={UTIL_STYLES.TEXT_CENTER}>Forgot Password</H1>
                    <Item>
                        <Input
                            autoCapitalize='none'
                            keyboardType='email-address'
                            onChangeText={e => setEmail(e)}
                            placeholder='Email'
                            value={email}
                        />
                    </Item>
                    <Button
                        block
                        disabled={loading}
                        onPress={() => {
                            setLoading(true);
                            dispatch(sendResetPasswordLink(email)).then(res => {
                                setLoading(false);

                                if (res.error) {
                                    axiosAlert('Reset failed', res.error);
                                }
                                else {
                                    Alert.alert('Reset Successful',
                                        get(res, 'payload.data.message', ''));
                                    navigation.goBack();
                                }
                            });
                        }}
                        style={{marginTop: 16}}
                        success
                    >
                        <Text>Reset Password</Text>
                    </Button>
                    <Button block onPress={() => navigation.goBack()} transparent>
                        <Text>Sign In</Text>
                    </Button>
                </Form>
            </Content>
        </SafeAreaView>
    );
};

export default connect()(ForgotPassword);

ForgotPassword.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired
    }).isRequired
};