import React, {Component} from 'react';
import Router from './routes/Router';
import {NavigationActions} from 'react-navigation';
import {AppState} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadUserData} from './redux/actions/seed';

class AppWrapper extends Component {
    constructor(props) {
        super(props);
        this.router = null;
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.authenticated && !nextProps.authenticated) {
            const navigateAction = NavigationActions.navigate({
                routeName: 'AppSwitch'
            });
            this.router.dispatch(navigateAction);

            return false;
        }

        return true;
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    setRouter = router => {
        this.router = router;
    };

    handleAppStateChange = nextAppState => {
        const {authenticated, dispatch} = this.props;

        if (authenticated && nextAppState === 'active') {
            dispatch(loadUserData());
        }
    };

    render() {
        return (
            <Router ref={router => this.setRouter(router)} uriPrefix='enroll://'/>
        );
    }
}

AppWrapper.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({authentication: {authenticated}}) => ({authenticated});

export default connect(mapStateToProps)(AppWrapper);