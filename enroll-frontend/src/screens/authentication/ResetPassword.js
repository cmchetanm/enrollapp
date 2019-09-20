import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, Alert} from 'react-native';
import {Button, Content, Form, H1, Input, Item, Label, Text} from 'native-base';
import {connect} from 'react-redux';
import get from 'lodash/get';
import {resetPassword} from '../../redux/actions/authentication';
import {axiosAlert} from '../../utils/axios';
import UTIL_STYLES from '../../styles/common';

const ResetPassword = ({dispatch, navigation}) => {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    return (
        <SafeAreaView style={UTIL_STYLES.ALIGN_MIDDLE}>
            <Content contentContainerStyle={UTIL_STYLES.ALIGN_MIDDLE} padder>
                <Form>
                    <H1 style={UTIL_STYLES.TEXT_CENTER}>Reset Password</H1>
                    <Item stackedLabel>
                        <Label>Password</Label>
                        <Input
                            onChangeText={e => setPassword(e)}
                            secureTextEntry
                            value={password}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Confirm Password</Label>
                        <Input
                            onChangeText={e => setPasswordConfirmation(e)}
                            secureTextEntry
                            value={passwordConfirmation}
                        />
                    </Item>
                    <Button
                        block
                        disabled={loading}
                        onPress={() => {
                            setLoading(true);
                            const params = {
                                password,
                                passwordConfirmation,
                                uid: navigation.getParam('uid'),
                                'access-token': navigation.getParam('access-token'),
                                client: navigation.getParam('client'),
                                expiry: navigation.getParam('expiry')
                            };
                            dispatch(resetPassword(params)).then(res => {
                                setLoading(false);

                                if (res.error) {
                                    axiosAlert('Reset failed', res.error);
                                }
                                else {
                                    Alert.alert('Password Reset',
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
                </Form>
            </Content>
        </SafeAreaView>
    );
};

export default connect()(ResetPassword);

ResetPassword.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        getParam: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired
    }).isRequired
};