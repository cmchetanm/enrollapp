import React from 'react';
import {Form, Input, Item, Label} from 'native-base';
import PropTypes from 'prop-types';
import UTIL_STYLES from '../../styles/common';

const MessageForm = ({message, onChange}) =>
    <Form>
        <Item stackedLabel>
            <Label>Message Text</Label>
            <Input
                maxLength={1024}
                multiline
                numberOfLines={8}
                onChangeText={text => onChange({...message, text})}
                placeholder='Start typing...'
                style={UTIL_STYLES.MESSAGE_INPUT}
                value={message.text}
            />
        </Item>
    </Form>;

MessageForm.propTypes = {
    message: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default MessageForm;