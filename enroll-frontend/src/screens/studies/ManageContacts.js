import React, {PureComponent} from 'react';
import {Button as DefaultButton, Platform} from 'react-native';
import {Button, Container, Content, Form, Icon, Input, Item, Label, Picker, Text} from 'native-base';
import {axiosAlert} from '../../utils/axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../../components/network/Loading';
import ContactRole, {ContactRoleHuman} from '../../values/ContactRole';
import {createShare} from '../../redux/actions/shares';
import Callout from '../../components/Callout';
import memoize from 'memoize-one';

const selectRole = role => {
    if (!role || role.length === 0) {
        if (Platform.OS === 'android') {
            return Object.keys(ContactRole)[0];
        }

        return null;
    }
    else if (Object.keys(ContactRole).includes(role)) {
        return role;
    }

    return ContactRole.OTHER;
};

const isOtherEnabled = role => {
    if (!role || role.length === 0) {
        return false;
    }
    else if (role === ContactRole.OTHER || !Object.keys(ContactRole).includes(role)) {
        return true;
    }

    return false;
};

class ManageShares extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerRight: navigation.getParam('contactsLength') > 0
            ? <DefaultButton
                disabled={navigation.getParam('saveButtonDisabled')}
                onPress={navigation.getParam('handleSubmit')}
                title='Save'
            /> : null
    });

    constructor(props) {
        super(props);
        this.study = props.navigation.state.params.study;
        this.inputs = {};
        this.state = {loading: false, contactId: null, role: null, text: null};
        this.focusListener = this.props.navigation.addListener('didFocus',
            () => {
                this.props.navigation.setParams({
                    contactsLength: this.filterContacts(this.props.contacts).length
                });
            });
    }

    componentDidMount() {
        this.props.navigation.setParams({handleSubmit: this.handleSubmit});

        if (Platform.OS === 'ios') {
            this.props.navigation.setParams({saveButtonDisabled: true});
        }
    }

    componentWillUnmount(): void {
        this.focusListener.remove();
    }

    handleSubmit = () => {
        this.setState({loading: true});
        const contactToDispatch = this.inputs.contact.props.selectedValue === null ? null : this.props.contacts
            .find(element => element.id === this.inputs.contact.props.selectedValue);
        this.props.dispatch(createShare(contactToDispatch === null ? null : contactToDispatch.id,
            this.study,
            this.state.role === ContactRole.OTHER
                ? this.state.text : this.inputs.role.props.selectedValue,
            contactToDispatch === null ? null : contactToDispatch))
            .then(response => {
                this.setState({loading: false});

                if (response.error) {
                    axiosAlert('Unable to update shares.', response.error);
                }
                else {
                    this.props.navigation.goBack();
                }
            });
    };

    filterContacts = memoize(contacts => {
        const userIds = this.study.shares.map(a => a.user.id);
        return contacts.filter(contact => !userIds.includes(contact.userId));
    });

    onValueChange = (contactId, role) => {
        if (contactId !== null) {
            if (this.inputs.role.props.selectedValue !== null && Platform.OS === 'ios') {
                this.props.navigation.setParams({saveButtonDisabled: false});
            }

            this.setState({contactId});
        }
        else if (role !== null) {
            if (this.inputs.contact.props.selectedValue !== null && Platform.OS === 'ios') {
                this.props.navigation.setParams({saveButtonDisabled: false});
            }

            this.setState({role});
        }
    };

    selectContactId = filterContacts => {
        let contactIdToSelect;

        if (Platform.OS === 'ios') {
            contactIdToSelect = filterContacts.length === 1
                ? filterContacts[0].id : this.state.contactId;
        }
        else {
            contactIdToSelect = !this.state.contactId && filterContacts.length > 0
                ? filterContacts[0].id : this.state.contactId;
        }

        return contactIdToSelect;
    };

    render() {
        const filterContacts = this.filterContacts(this.props.contacts);
        const contactIdToSelect = this.selectContactId(filterContacts);

        return this.state.loading ? <Loading/> : <Container>
            <Content>
                {filterContacts.length > 0 && <Content padder>
                    <Callout>
                        A notification email with instructions on how to join the study will
                        be immediately sent to all newly added team contacts.
                    </Callout>
                </Content>}
                {filterContacts.length > 0 ? <Form>
                    <Item>
                        <Label>Contact</Label>
                        <Picker
                            iosIcon={<Icon name='arrow-down'/>}
                            mode='dropdown'
                            onValueChange={contactId => this.onValueChange(contactId, null)}
                            placeholder='Select Contact'
                            ref={input => {
                                this.inputs.contact = input;
                            }}
                            selectedValue={contactIdToSelect}
                            style={{width: '100%'}}>
                            {filterContacts.map(contact =>
                                <Picker.Item key={contact.id} label={contact.fullName}
                                    value={contact.id}/>)}
                        </Picker>
                    </Item>
                    <Item>
                        <Label>Role</Label>
                        <Picker
                            iosIcon={<Icon name='arrow-down'/>}
                            mode='dropdown'
                            onValueChange={role => this.onValueChange(null, role)}
                            placeholder='Select Role'
                            ref={input => {
                                this.inputs.role = input;
                            }}
                            selectedValue={selectRole(this.state.role)}
                            style={{width: '100%'}}>
                            {Object.keys(ContactRoleHuman).filter(role => role !== ContactRole.PI)
                                .map(role => <Picker.Item key={role} label={ContactRoleHuman[role]} value={role}/>)}
                        </Picker>
                    </Item>
                    {isOtherEnabled(this.state.role) && <Item stackedLabel>
                        <Label>Specify Role</Label>
                        <Input
                            autoFocus
                            onChangeText={text => this.setState({text})}
                            onSubmitEditing={this.handleSubmit}
                            ref={input => {
                                this.inputs.specialRole = input;
                            }}
                            returnKeyType='done'
                            value={this.state.role === ContactRole.OTHER ? this.state.text : ''}/>
                    </Item>}
                </Form>
                    : <Content padder>
                        <Callout>To add an additional contact and share the study with that individual, the
                            contact must first be entered into the Study Directory on the Home page</Callout>
                        <Button
                            block
                            onPress={() =>
                                this.props.navigation.navigate('NewContact')
                            }
                            transparent
                        >
                            <Text>Add new person</Text>
                        </Button>
                    </Content>}
            </Content>
        </Container>;
    }
}

ManageShares.propTypes = {
    contacts: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        addListener: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
        setParams: PropTypes.func.isRequired,
        state: PropTypes.shape({
            params: PropTypes.shape({
                study: PropTypes.object.isRequired
            })
        })
    }).isRequired
};

const mapStateToProps = ({contacts}) => ({
    contacts: contacts.list
});

export default connect(mapStateToProps)(ManageShares);