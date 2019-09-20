import React from 'react';
import {Fab, Icon} from 'native-base';
import PropTypes from 'prop-types';
import commonColor from '../theme/variables/commonColor';

const FabButton = ({func, icon, color}) =>
    <Fab onPress={func} position='bottomRight' style={{backgroundColor: color}}>
        <Icon name={icon}/>
    </Fab>;

FabButton.defaultProps = {
    color: commonColor.brandSuccess
};

FabButton.propTypes = {
    color: PropTypes.string,
    func: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired
};

export default FabButton;