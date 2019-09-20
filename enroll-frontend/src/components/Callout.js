import React from 'react';
import UTIL_STYLES from '../styles/common';
import {Text} from 'native-base';
import PropTypes from 'prop-types';

const Callout = ({children}) =>
    <Text style={UTIL_STYLES.CALLOUT}>{children}</Text>;

Callout.propTypes = {
    children: PropTypes.any.isRequired
};

export default Callout;