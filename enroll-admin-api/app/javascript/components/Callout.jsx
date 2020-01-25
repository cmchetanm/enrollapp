import React from 'react';
import PropTypes from 'prop-types';

const Callout = ({icon, text, type}) => <div className={`${type} callout`}><i className={`fa fa-${icon}`}/>{text}</div>;

export const InfoCallout = ({text}) => <Callout icon='info-circle' text={text} type='info'/>;

export const SuccessCallout = ({text}) => <Callout icon='check' text={text} type='success'/>;

export const WarningCallout = ({text}) => <Callout icon='warning' text={text} type='warning'/>;

export const AlertCallout = ({text}) => <Callout icon='times-circle' text={text} type='alert'/>;

Callout.propTypes = {
    icon: PropTypes.oneOf(['info-circle', 'check', 'warning', 'times-circle']).isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'alert']).isRequired
};
InfoCallout.propTypes = {text: PropTypes.string.isRequired};
SuccessCallout.propTypes = {text: PropTypes.string.isRequired};
WarningCallout.propTypes = {text: PropTypes.string.isRequired};
AlertCallout.propTypes = {text: PropTypes.string.isRequired};