import React from 'react';
import {SafeAreaView} from 'react-native';
import {Spinner} from 'native-base';
import UTIL_STYLES from '../../styles/common';

const Loading = () =>
    <SafeAreaView style={UTIL_STYLES.ALIGN_MIDDLE}>
        <Spinner/>
    </SafeAreaView>;

export default Loading;