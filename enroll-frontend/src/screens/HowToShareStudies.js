import React from 'react';
import {SafeAreaView} from 'react-native';
import UTIL_STYLES from '../styles/common';
import {Card, CardItem, Content, Text} from 'native-base';

const HowToShareStudies = () =>
    <SafeAreaView style={UTIL_STYLES.ALIGN_MIDDLE}>
        <Content padder>
            <Card>
                <CardItem>
                    <Text>
                        {'To share a study with a colleague, enter the colleague\'s contact ' +
                        'information into the "Study Team Directory", open the study to ' +
                        'be shared and add that individual to the "contact/share" list.\n\n' +
                        'The individual will then receive instructions on how to download ' +
                        'the app/study onto their mobile device.'}
                    </Text>
                </CardItem>
            </Card>
        </Content>
    </SafeAreaView>;

export default HowToShareStudies;