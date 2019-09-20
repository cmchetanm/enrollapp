import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Loading from '../components/network/Loading';
import {loadUserData} from '../redux/actions/seed';

class AppSwitch extends PureComponent {
    componentDidMount() {
        const {authenticated, dispatch, navigation} = this.props;

        if (authenticated) {
            dispatch(loadUserData());

            if (navigation.state.params) {
                navigation.navigate(navigation.state.params.initialRoute);
            }
            else {
                navigation.navigate('Topics');
            }
        }
        else {
            navigation.navigate('SignIn');
        }
    }

    render() {
        return (
            <Loading/>
        );
    }
}

AppSwitch.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        state: PropTypes.shape({
            params: PropTypes.shape({
                initialRoute: PropTypes.string
            })
        })
    }).isRequired
};

const mapStateToProps = ({authentication: {authenticated}}) => ({authenticated});

export default connect(mapStateToProps)(AppSwitch);