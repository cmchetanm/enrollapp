import React from 'react';
import {Linking, View} from 'react-native';
import {Button, Content, Icon, Left, ListItem, Text, Grid, Col} from 'native-base';
import PropTypes from 'prop-types';
import UTIL_STYLES from '../../styles/common';
import commonColor from '../../theme/variables/commonColor';
import Communications from 'react-native-communications';

const sendSMSFunction = (number, text) => {
    Communications.text(number, text);
};

const phoneCallFunction = number => {
    Communications.phonecall(number, true);
};

const formatNumberInDigitsOnly = number => {
    let givenNumber = number;
    const notAllowedCharacters = [' ', '(', ')', '-'];
    notAllowedCharacters.forEach(element => {
        givenNumber = givenNumber.replace(element, '');
    });
    return givenNumber;
};

const onPressSMS = (number, smsText) => {
    const updatedNumber = formatNumberInDigitsOnly(number);
    sendSMSFunction(updatedNumber, smsText);
};

const onPressCall = number => {
    const updatedNumber = formatNumberInDigitsOnly(number);
    phoneCallFunction(updatedNumber);
};

const ContactView = ({contact}) =>
    <View>
        <ListItem>
            <Left>
                <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                    Name
                </Text>
            </Left>
            <Text>{contact.fullName}</Text>

        </ListItem>
        <ListItem onPress={() => Linking.openURL(`mailto:${contact.email}`)}>
            <Left>
                <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                    Email
                </Text>
            </Left>
            <Text style={{color: commonColor.brandPrimary}}>{contact.email}</Text>
        </ListItem>
        {contact.phoneNumber && <ListItem>
            <Left>
                <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                    Mobile Phone
                </Text>
            </Left>
            <Text style={{color: commonColor.brandPrimary}}>{contact.phoneNumber}</Text>
        </ListItem>}
        <Grid>
            <Col>
                <Content padder>
                    <Button block bordered iconLeft info onPress={() =>
                        Linking.openURL(`mailto:${contact.email}`)}>
                        <Icon name='mail'/>
                        <Text>Email {contact.firstName}</Text>
                    </Button>
                </Content>
            </Col>
            {contact.phoneNumber && <Col>
                <Content padder>
                    <Button block bordered iconLeft info onPress={() =>
                        onPressCall(contact.phoneNumber)}>
                        <Icon name='call'/>
                        <Text>Call {contact.firstName}</Text>
                    </Button>
                </Content>
            </Col>}
        </Grid>
        {contact.phoneNumber && <Grid>
            <Col>
                <Content padder>
                    <Button block bordered iconLeft info onPress={() => onPressSMS(contact.phoneNumber, '')}>
                        <Icon name='ios-text'/>
                        <Text>Text {contact.firstName}</Text>
                    </Button>
                </Content>
            </Col>
        </Grid>}
    </View>;

ContactView.propTypes = {
    contact: PropTypes.object.isRequired
};

export default ContactView;