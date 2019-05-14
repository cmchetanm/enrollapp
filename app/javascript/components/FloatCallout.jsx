import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {notify} from 'react-notify-toast';

export default class FloatCallout extends PureComponent {
    componentDidMount() {
        notify.show(this.props.text, this.props.type);
    }

    render() {
        return null;
    }
}

FloatCallout.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error', 'success', 'warning']).isRequired
};