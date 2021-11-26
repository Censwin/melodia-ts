/*
 * @Date: 2021-11-17 16:22:13
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-23 17:13:08
 * @Description:
 * @FilePath: \melodia-ts\src\baseUI\Header\header.tsx
 */
import React from 'react';
import { Marquee } from '..';
import { Icon } from './../../components';
interface IHeaderProps {
  handleClick: Function;
  title: string;
  rolling?: boolean;
  style?: React.CSSProperties;
}

const Header: React.FC<IHeaderProps> = (props) => {
  const { title, handleClick, rolling, style } = props;
  return (
    <div className="header-container" onClick={() => handleClick()} style={style}>
      <Icon className="header-back" icon="chevron-left" />
      <div className="title-wrapper">
        {rolling ? <Marquee text={title} /> : <span>{title}</span>}
      </div>
    </div>
  );
};

export default React.memo(Header);
