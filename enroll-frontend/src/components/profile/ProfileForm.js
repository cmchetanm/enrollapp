import React, {PureComponent} from 'react';
import {Form, Input, Item, Label} from 'native-base';
import PropTypes from 'prop-types';

class ProfileForm extends PureComponent {
    constructor(props) {
        super(props);

        this.inputs = {};
    }

    focusNextField = id => {
        this.inputs[id]._root.focus();
    };

    render() {
        const {profile, onChange, onSubmit} = this.props;
        return <Form>
            <Item stackedLabel>
                <Label>First Name</Label>
                <Input
                    autoCorrect={false}
                    autoFocus={typeof profile.id === 'undefined'}
                    onChangeText={text => onChange({...profile, firstName: text})}
                    onSubmitEditing={() => this.focusNextField('lastName')}
                    ref={input => {
                        this.inputs.firstName = input;
                    }}
                    returnKeyType='next' value={profile.firstName}/>
            </Item>
            <Item stackedLabel>
                <Label>Last Name</Label>
                <Input
                    autoCorrect={false}
                    autoFocus={typeof profile.id === 'undefined'}
                    onChangeText={text => onChange({...profile, lastName: text})}
                    onSubmitEditing={() => this.focusNextField('email')}
                    ref={input => {
                        this.inputs.lastName = input;
                    }}
                    returnKeyType='next'
                    value={profile.lastName}/>
            </Item>
            <Item stackedLabel>
                <Label>Email</Label>
                <Input
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    onChangeText={text => onChange({...profile, email: text})}
                    onSubmitEditing={() => this.focusNextField('phoneNumber')}
                    ref={input => {
                        this.inputs.email = input;
                    }}
                    returnKeyType='next'
                    value={profile.email}/>
            </Item>
            <Item stackedLabel>
                <Label>Mobile Phone</Label>
                <Input keyboardType='phone-pad' onChangeText={text =>
                    onChange({...profile, phoneNumber: text})} ref={input => {
                    this.inputs.phoneNumber = input;
                }} returnKeyType='next' value={profile.phoneNumber}/>
            </Item>
            <Item stackedLabel>
                <Label>New Password (leave blank if unchanged)</Label>
                <Input
                    blurOnSubmit
                    onChangeText={text => onChange({...profile, password: text})}
                    onSubmitEditing={() => onSubmit()}
                    ref={input => {
                        this.inputs.password = input;
                    }}
                    returnKeyType='done'
                    secureTextEntry
                    value={profile.password}
                />
            </Item>
        </Form>;
    }
}

ProfileForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

export default ProfileForm;