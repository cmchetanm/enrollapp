import React, {PureComponent} from 'react';
import {Form, Input, Item, Label} from 'native-base';
import PropTypes from 'prop-types';

class ContactForm extends PureComponent {
    inputs = {};

    focusNextField = id => {
        this.inputs[id]._root.focus();
    };

    render() {
        const {contact, onChange, onSubmit} = this.props;
        return <Form>
            <Item stackedLabel>
                <Label>First Name</Label>
                <Input
                    autoCorrect={false}
                    autoFocus={typeof contact.id === 'undefined'}
                    onChangeText={text => onChange({...contact, firstName: text})}
                    onSubmitEditing={() => this.focusNextField('lastName')}
                    ref={input => {
                        this.inputs.firstName = input;
                    }} returnKeyType='next' value={contact.firstName}/>
            </Item>
            <Item stackedLabel>
                <Label>Last Name</Label>
                <Input
                    autoCorrect={false}
                    onChangeText={text => onChange({...contact, lastName: text})}
                    onSubmitEditing={() => this.focusNextField('email')}
                    ref={input => {
                        this.inputs.lastName = input;
                    }} returnKeyType='next' value={contact.lastName}/>
            </Item>
            <Item stackedLabel>
                <Label>Email</Label>
                <Input
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    onChangeText={text => onChange({...contact, email: text})}
                    onSubmitEditing={() => this.focusNextField('phoneNumber')}
                    ref={input => {
                        this.inputs.email = input;
                    }}
                    returnKeyType='next' value={contact.email}/>
            </Item>
            <Item stackedLabel>
                <Label>Mobile Phone</Label>
                <Input
                    keyboardType='phone-pad'
                    onChangeText={text => onChange({...contact, phoneNumber: text})}
                    onSubmitEditing={() => onSubmit()}
                    ref={input => {
                        this.inputs.phoneNumber = input;
                    }}
                    returnKeyType='done' value={contact.phoneNumber}/>
            </Item>
        </Form>;
    }
}

ContactForm.propTypes = {
    contact: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default ContactForm;