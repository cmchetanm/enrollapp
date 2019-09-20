import React from 'react';
import {Body, Container, Content, Fab, Icon, Left, ListItem, Right, Text} from 'native-base';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import commonColor from '../../theme/variables/commonColor';
import Callout from '../../components/Callout';
import UTIL_STYLES from '../../styles/common';

const Team = ({contacts, navigation}) =>
    <Container>
        <Content>
            {contacts.length > 0 ? contacts.map(contact =>
                <ListItem icon key={contact.id} onPress={() =>
                    navigation.navigate('Contact', {contact})}>
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
            onPress={() => navigation.navigate('NewContact')}
            position='bottomRight' style={{backgroundColor: commonColor.brandSuccess}}>
            <Text style={UTIL_STYLES.FAB_TEXT}>Add Person</Text>
        </Fab>
    </Container>;

Team.propTypes = {
    contacts: PropTypes.array.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};

const mapStateToProps = ({contacts, studies}) => ({
    contacts: contacts.list,
    study: studies.study
});

export default connect(mapStateToProps)(Team);