import React from 'react';
import {Button, Container, Content, Icon, Left, List, ListItem, Text} from 'native-base';
import UTIL_STYLES from '../styles/common';
import {Linking} from 'react-native';
import commonColor from '../theme/variables/commonColor';

const onPressCallMail = () => {
    const url = 'mailto:info@refuahsolutions.com';
    Linking.canOpenURL(url)
        .then(supported => {
            if (!supported) {
                return null;
            }

            return Linking.openURL(url)
                .catch(() => null);
        });
};

const onPressCallWebsite = () => {
    const url = 'https://www.refuahsolutions.com/';
    Linking.canOpenURL(url)
        .then(supported => {
            if (supported) {
                return Linking.openURL(url)
                    .catch(() => null);
            }

            return null;
        });
};

const ContactUs = () =>
    <Container>
        <Content>
            <List>
                <ListItem>
                    <Left>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Company
                        </Text>
                    </Left>
                    <Text>Refuah Solutions Ltd.</Text>
                </ListItem>
                <ListItem onPress={() => onPressCallMail()}>
                    <Left>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Email
                        </Text>
                    </Left>
                    {/* {Changes to the email link below,
                    must be matched with the link inside the function 'onPressCallMail' above}*/}
                    <Text style={{color: commonColor.brandPrimary}}>info@refuahsolutions.com</Text>
                </ListItem>
                <ListItem onPress={() => onPressCallWebsite()}>
                    <Left>
                        <Text note style={UTIL_STYLES.ALIGN_LEFT}>
                            Website
                        </Text>
                    </Left>
                    {/* {Changes to the website link below,
                    must be matched with the link inside the function 'onPressCallWebsite' above}*/}
                    <Text style={{color: commonColor.brandPrimary}}>refuahsolutions.com</Text>
                </ListItem>
            </List>
            <Content padder>
                <Button block bordered iconLeft info onPress={() =>
                    onPressCallMail()}>
                    <Icon name='contact'/>
                    <Text>Email Refuah Solutions</Text>
                </Button>
            </Content>
        </Content>
    </Container>;

export default ContactUs;