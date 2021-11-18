/*
 * @Date: 2021-11-17 16:22:13
 * @LastEditors:
 * @LastEditTime: 2021-11-18 11:00:02
 * @Description:
 * @FilePath: \melodia-ts\src\baseUI\Header\header.tsx
 */
import React from 'react';
import { Icon } from './../../components';

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
