import {Dimensions, StyleSheet} from 'react-native';

export const WINDOW_HEIGHT = Dimensions.get('window').height;

export const WINDOW_WIDTH = Dimensions.get('window').width;

const UTIL_STYLES = StyleSheet.create({
    ALIGN_CENTER: {
        alignSelf: 'center'
    },
    ALIGN_MIDDLE: {
        flex: 1,
        justifyContent: 'center'
    },
    CALLOUT: {
        backgroundColor: '#00d7f4',
        borderRadius: 10,
        padding: 10,
        overflow: 'hidden'
    },
    FULL_HEIGHT: {
        flex: 1
    },
    TEXT_CENTER: {
        textAlign: 'center'
    },
    ALIGN_LEFT: {
        alignSelf: 'flex-start'
    },
    FLEX: {
        flex: 1
    },
    LOGO: {
        alignSelf: 'center',
        marginBottom: 20,
        resizeMode: 'contain',
        width: '50%'
    },
    FAB_TEXT: {
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 12,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    CRITERIA_FORM_MODAL_BUTTON_CENTERED: {
        alignSelf: 'center',
        marginBottom: 20,
        width: '50%'
    },
    CRITERIA_FORM_MODAL_VIEW_STYLES: {
        borderColor: '#D9D5DC',
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 2,
        width: '100%'
    },
    CRITERIA_FORM_MODAL_INPUT_STYLES: {
        fontSize: 18
    },
    MESSAGE_INPUT: {
        margin: 10,
        paddingBottom: 10
    },
    MESSAGE_CONTAINER: {
        marginLeft: 5,
        marginRight: 5
    },
    MESSAGE_HEADER: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5
    },
    MARGIN_BOTTOM: {
        marginBottom: 10
    }
});

export default UTIL_STYLES;