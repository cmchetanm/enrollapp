import React from 'react';
import {View} from 'react-native';
import {Left, ListItem, Text} from 'native-base';
import PropTypes from 'prop-types';
import UTIL_STYLES from '../../styles/common';

const MessageView = ({message}) =>
    <View>
        <ListItem>
            <Left>
                <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                    Full Name
                </Text>
            </Left>
            <Text>{message.fullName}</Text>
        </ListItem>
        <ListItem>
            <Left>
                <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                    Message Date
                </Text>
            </Left>
            <Text>{message.createdAt}</Text>
        </ListItem>
        <ListItem noBorder>
            <Left>
                <Text>{message.text}</Text>
            </Left>
        </ListItem>
    </View>;

MessageView.propTypes = {
    message: PropTypes.object.isRequired
};

export default MessageView;