import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {WINDOW_WIDTH} from '../../styles/common';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {scale} from '../../utils/sizing';

const STYLE = StyleSheet.create({
    offlineContainer: {
        width: WINDOW_WIDTH,
        position: 'absolute',
        bottom: 0,
        zIndex: 999
    },
    offlineNotice: {
        alignItems: 'center',
        backgroundColor: 'red',
        flexDirection: 'row',
        height: scale(30),
        justifyContent: 'center'
    },
    offlineText: {
        color: 'white'
    }
});

const MiniOfflineSign = () =>
    <SafeAreaView style={STYLE.offlineContainer}>
        <View style={[STYLE.offlineNotice]}>
            <Text style={STYLE.offlineText}>No Internet Connection</Text>
        </View>
    </SafeAreaView>;
const OfflineNotice = props => props.network.isConnected ? null : <MiniOfflineSign/>;

OfflineNotice.propTypes = {
    network: PropTypes.shape({
        isConnected: PropTypes.bool.isRequired
    }).isRequired
};

const mapStateToProps = ({network}) => ({network});

export default connect(mapStateToProps)(OfflineNotice);