import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

type themeType = 'default' | 'primary' | 'success' | 'danger' | 'light';

interface IconProps extends FontAwesomeIconProps {
    theme?: themeType;
}

const Icon: React.FC<IconProps> = (props) => {
    const { className, theme } = props;
    const classes = classNames('my-icon', className, {
        [`my-icon-${theme}`]: theme
    });
    return <FontAwesomeIcon {...props} className={classes} />;
};

export default Icon;
