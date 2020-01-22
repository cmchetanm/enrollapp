import React, {PureComponent} from 'react';
import {Button as DefaultButton, Platform, TouchableOpacity, Dimensions, View} from 'react-native';
import {Button, Container, Content, Form, Icon, Input, Item, Label, Picker, Text} from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import {fetchStudies} from '../../redux/actions/studies';
import {axiosAlert} from '../../utils/axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../../components/network/Loading';
import ContactRole, {ContactRoleHuman} from '../../values/ContactRole';
import {createShares} from '../../redux/actions/shares';
import Callout from '../../components/Callout';
import memoize from 'memoize-one';
import { print } from '../../utils/list';
import UTIL_STYLES from '../../styles/common';
import styled from 'styled-components/native';

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
        headerTitle: 'Invite a Colleage',
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          marginLeft: 15,
          marginTop: 15,
        },
        headerStyle: {
          backgroundColor: '#3F51B5',
          height: 70
        },
        headerRight: (() => (
            navigation.getParam('contactsLength') > 0 ? <TouchableOpacity
                disabled={navigation.getParam('saveButtonDisabled')}
                onPress={navigation.getParam('handleSubmit')}
                style={{ marginTop: 12, marginRight: 12 }}
            >
                <Text style={{ fontSize: 17, color: '#FFFFFF' }}>Invite</Text>
            </TouchableOpacity> : null
        ))
    });

    constructor(props) {
        super(props);
        const study = props.navigation.state.params ? props.navigation.state.params.study.id : '';
        this.state = {loading: false, text: null, invites: [], invite: { contact: '', role: '', study }};
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

    handleSubmit = async () => {
        this.setState({loading: true});
        const { invite, invites } = this.state;
        const fullInvites = invites.slice();
        if (this.inviteReady()) {
            fullInvites.push(invite);
        }
        const shares = fullInvites.map(inv => {
            return {
                studyId: inv.study,
                contactId: inv.contact,
                contact: this.getContact(inv.contact),
                role: inv.role
            };
        });
        let response = null;
        try {
            const params = this.props.navigation.state.params;
            const study = params && params.study ? params.study.id : '';
            response = await this.props.dispatch(createShares(shares, study));
        } catch (e) {
            print('error caught');
            print(e);
        }
        this.setState({loading: false});

        if (response && response.error) {
            axiosAlert('Unable to update shares.', response.error);
        }
        else {
            await this.props.dispatch(fetchStudies());
            this.props.navigation.goBack();
        }
    };

    filterContacts = (contacts, study) => {
        const fullStudy = this.props.studies.find(s => s.id === study);
        const userIdsToFromStudy = fullStudy ? fullStudy.shares.map(a => a.user.id) : [];
        const filteredInvites = this.state.invites.filter(inv => inv.study === study);
        const userIdsToExclude = userIdsToFromStudy.concat(filteredInvites.map(inv => inv.contact));
        const returnValue = contacts.filter(contact => !userIdsToExclude.includes(contact.id));
        return returnValue;
    };

    onValueChange = (contactId, role, study) => {
        let invite = this.state.invite;
        if (contactId !== null) {
            if (invite.study !== null && invite.role !== null && Platform.OS === 'ios') {
                this.props.navigation.setParams({saveButtonDisabled: false});
            }
            invite = { ...invite, contact: contactId };
        }
        else if (role !== null) {
            if (this.state.study !== null && this.state.contactId !== null && Platform.OS === 'ios') {
                this.props.navigation.setParams({saveButtonDisabled: false});
            }
            invite = { ...invite, role };
        }
        else if (study !== null) {
            if (this.state.role !== null && this.state.contactId !== null && Platform.OS === 'ios') {
                this.props.navigation.setParams({saveButtonDisabled: false});
            }
            invite = { ...invite, study, contact: '' };
        }

        this.setState({invite});
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

    inviteReady = () => {
        const { invite } = this.state;
        return !!invite.study && !!invite.role && !!invite.contact;
    };

    studyName = (id) => {
        const fullStudy = this.props.studies.find(s => s.id === id);
        return fullStudy ? fullStudy.name : '';
    };

    getContact = (id) => {
        return this.props.contacts.find(s => s.id === id);
    };

    contactName = (id) => {
        const fullContact = this.getContact(id);
        return fullContact ? fullContact.fullName : '';
    };

    newInvite = () => {
        const invites = this.state.invites.slice();
        const params = this.props.navigation.state.params;
        const study = params && params.study ? params.study.id : '';
        const invite = { contact: '', role: '', study };
        invites.push(this.state.invite);
        this.setState({ invites, invite });
    };

    deleteInvite = (index) => {
        const invites = this.state.invites.slice();
        invites.splice(index, 1);
        this.setState({ invites });
    };

    render() {
        const { invites, invite } = this.state;
        const filterContacts = this.filterContacts(this.props.contacts, invite.study);
        const contactIdToSelect = this.selectContactId(filterContacts);
        const width = Dimensions.get('window').width - 20;

        return this.state.loading ? <Loading/> : <Container>
            <Content>
                {filterContacts.length > 0 && <Content padder>
                    <Callout>
                        A notification email with instructions on how to join the study will
                        be immediately sent to all newly added team contacts.
                    </Callout>
                </Content>}
                {filterContacts.length > 0 ?
                <Form>
                    <Item>
                        <Dropdown
                            label="Study"
                            value={this.studyName(invite.study)}
                            onChangeText={study => this.onValueChange(null, null, study)}
                            containerStyle={{ justifyContent: 'center', width }}
                            data={this.props.studies.map(study => {
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
                            label="Contact"
                            value={this.contactName(invite.contact)}
                            onChangeText={contactId => {
                                this.onValueChange(contactId, null, null);
                            }}
                            containerStyle={{ justifyContent: 'center', width }}
                            data={filterContacts.map(contact => ({
                                label: contact.fullName,
                                value: contact.id
                            }))}
                        />
                    </Item>
                    <Item>
                        <Dropdown
                            label="Role"
                            value={invite.role.toString()}
                            onChangeText={role => {
                                this.onValueChange(null, role, null);
                            }}
                            containerStyle={{ justifyContent: 'center', width }}
                            data={Object.keys(ContactRoleHuman).filter(role => role !== ContactRole.PI).map(role => ({
                                label: ContactRoleHuman[role],
                                value: role
                            }))}
                        />
                    </Item>
                    {this.inviteReady() && <Item stackedLabel>
                        <Button
                            onPress={this.newInvite}
                            small
                            style={UTIL_STYLES.MARGIN_BOTTOM, { alignSelf: 'center' }}
                            transparent
                        >
                            <Icon name='add' />
                            <Text style={{ marginLeft: -20 }}>Invite Another Person</Text>
                        </Button>
                    </Item>}
                    {invites.map((inv, index) =>
                        <Item>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ width: width - 50, borderWidth: 1, borderColor: '#000000' }}>
                                    <Form>
                                        <Item>
                                            <Text style={{ margin: 10 }}>
                                                Study: {this.studyName(inv.study)}
                                            </Text>
                                        </Item>
                                        <Item>
                                            <Text style={{ margin: 10 }}>
                                                Contact: {this.contactName(inv.contact)}
                                            </Text>
                                        </Item>
                                        <Item>
                                            <Text style={{ margin: 10 }}>
                                                Role: {ContactRoleHuman[inv.role]}
                                            </Text>
                                        </Item>
                                    </Form>
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <DeleteButton onPress={() => this.deleteInvite(index)}>
                                        <Icon name="close" style={{ color: "#FFFFFF", marginLeft: 8, fontSize: 20 }}></Icon>
                                    </DeleteButton>
                                </View>
                            </View>
                        </Item>
                    )}
                    {isOtherEnabled(this.state.role) && <Item stackedLabel>
                        <Label>Specify Role</Label>
                        <Input
                            autoFocus
                            onChangeText={text => this.setState({text})}
                            onSubmitEditing={this.handleSubmit}
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
                study: PropTypes.object
            })
        })
    }).isRequired
};

const mapStateToProps = ({contacts, studies}) => ({
    contacts: contacts.peers,
    studies: studies.list
});

export default connect(mapStateToProps)(ManageShares);

const DeleteButton = styled.TouchableOpacity`
    width: 26px;
    height: 26px;
    margin: 5px;
    margin-bottom: 13px;
    border-radius: 13px;
    justify-content: center;
    background-color: #FF0000;
`;
