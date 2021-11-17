import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import { INativeProps } from '../../utils/common_interface';
interface ICardProps {
  title: React.ReactNode; // header 左边区域
  extra?: React.ReactNode; // header 右边区域
  headerStyle?: React.CSSProperties;
  headerClassName?: string;
  bodyStyle?: React.CSSProperties;
  bodyClassName?: string;
  onClick?: (event: MouseEvent) => void;
}

const Card: React.FC<ICardProps & INativeProps> = (props) => {
  const { title, extra } = props;
  const { className, headerClassName, headerStyle, bodyClassName, bodyStyle } = props;
  const classes = classNames('card-wrapper', className);
  const headerClasses = classNames('card-header', headerClassName);
  const bodyClasses = classNames('card-body', bodyClassName);
  return (
    <div className={classes}>
      <div className={headerClasses} style={headerStyle}>
        <div className="card-header-title">{title}</div>
        <div className="card-header-extra">{extra}</div>
      </div>
      <div className={bodyClasses} style={bodyStyle}>
        {props.children}
      </div>
    </div>
  );
};

export default Card;
