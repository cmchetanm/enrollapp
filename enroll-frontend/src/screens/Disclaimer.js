import React from 'react';
import {SafeAreaView} from 'react-native';
import UTIL_STYLES from '../styles/common';
import {Card, CardItem, Content, Text} from 'native-base';

const Disclaimer = () =>
    <SafeAreaView style={UTIL_STYLES.ALIGN_MIDDLE}>
        <Content padder>
            <Card>
                <CardItem>
                    <Text>
                        {'Enroll does not require or advise the inputting of confidential medical patient ' +
                        'information into the App.\n\nWhen using the App, you agree to abide by all governing ' +
                        'privacy legislation in your jurisdiction, including but not limited, any laws related ' +
                        'to the protection of patient information. For clarity, you agree to assume full ' +
                        'responsibility of your actions to the extent that Refuah Solutions Ltd (the developer ' +
                        'of Enroll)  is not liable in any way for any privacy breaches that arise as a result ' +
                        'of your use of the App.\n\nYou further agree to fully indemnify (Refuah), legal costs ' +
                        'included, from any costs it incurs in the event that you are alleged, in a legal ' +
                        'proceeding, to have committed a breach of any provision of such applicable legislation ' +
                        'or in law as a result of your use of the App.'}
                    </Text>
                </CardItem>
            </Card>
        </Content>
    </SafeAreaView>;

export default Disclaimer;