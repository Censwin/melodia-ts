import React from 'react';
import Icon from './../../components/Icon/icon';

interface IHeaderProps {
  handleClick: Function;
  title: string;
}

const Header: React.FC<IHeaderProps> = (props) => {
  const { title, handleClick } = props;
  return (
    <div className="header-container" onClick={() => handleClick()}>
      <Icon className="header-back" icon="chevron-left" />
      <span>{title}</span>
    </div>
  );
};

export default React.memo(Header);
