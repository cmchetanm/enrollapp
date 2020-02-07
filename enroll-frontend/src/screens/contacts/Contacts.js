import React, {PureComponent} from 'react';
import {Button, Body, Container, Content, Fab, Icon, Left, ListItem, Right, Text} from 'native-base';
import { Platform } from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ContactRole from '../../values/ContactRole';
import commonColor from '../../theme/variables/commonColor';
import Callout from '../../components/Callout';
import UTIL_STYLES from '../../styles/common';
import {sortListAb, print} from '../../utils/list';


class Team extends PureComponent {
    static navigationOptions = {
        title: "Directory",
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          marginLeft: Platform.OS === 'ios' ? -90 : 72,
          marginTop: 15,
        },
        headerStyle: {
          backgroundColor: '#3F51B5',
          height: 70
        },
    };

    constructor(props) {
        super(props);
        this.myStudies = props.studies.filter(st => this.canAdd(st.id, props.permissions));
    }

    canAdd = (studyId, permissions) => {
        const role = permissions[studyId];
        return role === ContactRole.SUB || role === ContactRole.NURSE || role === ContactRole.PI;
    };

    render() {
        const {contacts, navigation} = this.props;
        return (<Container>
                <Content>
                    {contacts.length > 0 ? sortListAb(contacts, c => c.fullName).map(contact =>
                        <ListItem icon key={contact.id} onPress={() => {
                            navigation.navigate('Contact', {contact});
                        }}>
                            <Left>
                                <Icon name='contact' style={{color: commonColor.brandInfo}}/>
                            </Left>
                            <Body>
                                <Text>{contact.fullName}</Text>
                            </Body>
                            <Right>
                                <Icon name='arrow-forward'/>
                            </Right>
                        </ListItem>)
                        : <Content padder>
                            <Callout>You have not added anyone to the team directory.</Callout>
                        </Content>}
                    {this.myStudies.length > 0 && 
                        <Content padder>
                            <Callout>To add an additional contact and share the study with that individual</Callout>
                            <Button
                                block
                                onPress={() =>
                                    this.props.navigation.navigate('NewContact', { studies: this.myStudies })
                                }
                                transparent
                            >
                                <Text>Add new colleague</Text>
                            </Button>
                        </Content>
                    }
                </Content>
                {this.myStudies.length > 0 &&
                    <Fab
                        onPress={() => navigation.navigate('ManageContacts')}
                        position='bottomRight' style={{backgroundColor: commonColor.brandSuccess}}>
                        <Text style={UTIL_STYLES.FAB_TEXT}>Add</Text>
                    </Fab>
                }
            </Container>
        );
    };
}

Team.propTypes = {
    contacts: PropTypes.array.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};

const mapStateToProps = ({authentication: {profile, permissions}, contacts, studies}) => ({
    contacts: contacts.peers,
    study: studies.study,
    studies: studies.list,
    permissions,
    profile
});

export default connect(mapStateToProps)(Team);