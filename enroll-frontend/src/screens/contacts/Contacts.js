import React, {PureComponent} from 'react';
import {Body, Container, Content, Fab, Icon, Left, ListItem, Right, Text} from 'native-base';
import { Platform } from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import commonColor from '../../theme/variables/commonColor';
import Callout from '../../components/Callout';
import UTIL_STYLES from '../../styles/common';
import {sortListAb} from '../../utils/list';


class Team extends PureComponent {
    static navigationOptions = {
        title: "Team",
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

    render() {
        const {contacts, navigation} = this.props;
        return (<Container>
                <Content>
                    {contacts.length > 0 ? sortListAb(contacts, 'fullName').map(contact =>
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
                </Content>
                <Fab
                    onPress={() => navigation.navigate('ManageContacts')}
                    position='topRight' style={{backgroundColor: commonColor.brandSuccess}}>
                    <Text style={UTIL_STYLES.FAB_TEXT}>Add Person</Text>
                </Fab>
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

const mapStateToProps = ({contacts, studies}) => ({
    contacts: contacts.peers,
    study: studies.study
});

export default connect(mapStateToProps)(Team);