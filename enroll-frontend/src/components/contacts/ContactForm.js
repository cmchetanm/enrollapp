import React, {PureComponent} from 'react';
import { Dimensions } from 'react-native';
import {Form, Input, Item, Label} from 'native-base';
import ContactRole, { ContactRoleHuman } from '../../values/ContactRole';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import PropTypes from 'prop-types';
import { print } from '../../utils/list';

class ContactForm extends PureComponent {
    inputs = {};

    focusNextField = id => {
        this.inputs[id]._root.focus();
    };

    studyName = (id) => {
        const fullStudy = this.study(id);
        return fullStudy ? fullStudy.name : '';
    };

    study = (id) => {
        const fullStudy = this.props.studies.find(s => s.id === id);
        return fullStudy ? fullStudy.name : '';
    };

    render() {
        const { contact, onChange, onSubmit, studies } = this.props;
        const width = Dimensions.get('window').width - 20;
        return <Form>
                    <Item>
                        <Dropdown
                            label="Study"
                            value={this.studyName(contact.study)}
                            onChangeText={study => {
                                onChange({ ...contact, study: this.study(study) });
                            }}
                            containerStyle={{ justifyContent: 'center', width }}
                            data={studies.map(study => {
                                const dataObject = {
                                    label: study.name,
                                    value: study.id
                                };
                                return (dataObject);
                            })}
                        />
                    </Item>
                    <Item>
                        <Dropdown
                            label="Role"
                            value={contact.role}
                            onChangeText={role => {
                                onChange({ ...contact, role });
                            }}
                            containerStyle={{ justifyContent: 'center', width }}
                            data={Object.keys(ContactRoleHuman).filter(role => role !== ContactRole.PI).map(role => ({
                                label: ContactRoleHuman[role],
                                value: role
                            }))}
                        />
                    </Item>
            <Item stackedLabel>
                <Label>First Name</Label>
                <Input
                    autoCorrect={false}
                    autoFocus={typeof contact.id === 'undefined'}
                    onChangeText={text => onChange({ ...contact, firstName: text })}
                    onSubmitEditing={() => this.focusNextField('lastName')}
                    ref={input => {
                        this.inputs.firstName = input;
                    }} returnKeyType='next' value={contact.firstName}/>
            </Item>
            <Item stackedLabel>
                <Label>Last Name</Label>
                <Input
                    autoCorrect={false}
                    onChangeText={text => onChange({ ...contact, lastName: text })}
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
                    onChangeText={text => onChange({ ...contact, email: text })}
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
                    onChangeText={text => onChange({ ...contact, phoneNumber: text })}
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
    onSubmit: PropTypes.func.isRequired
};

const mapStateToProps = ({ authentication: {permissions} }) => ({
    permissions
});

export default connect(mapStateToProps)(ContactForm);