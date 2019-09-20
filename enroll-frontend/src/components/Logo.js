import React from 'react';
import {Image} from 'react-native';
import UTIL_STYLES from '../styles/common';

// eslint-disable-next-line global-require, no-undef
const Logo = () => <Image source={require('../assets/logo.png')} style={UTIL_STYLES.LOGO}/>;

export default Logo;