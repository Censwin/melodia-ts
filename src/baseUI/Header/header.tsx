/*
 * @Date: 2021-11-17 16:22:13
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-29 11:13:27
 * @Description:
 * @FilePath: \melodia-ts\src\baseUI\Header\header.tsx
 */
import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { Marquee } from '..';
import { Icon } from './../../components';
interface IHeaderProps {
  handleClick: Function;
  title: string;
  rolling?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const Header = forwardRef<HTMLDivElement, IHeaderProps>((props, ref) => {
  const { title, handleClick, rolling, style, className } = props;
  const classes = classNames('header-container', className);
  return (
    <div className={classes} onClick={() => handleClick()} style={style} ref={ref}>
      <Icon className="header-back" icon="chevron-left" />
      <div className="title-wrapper">
        {rolling ? <Marquee text={title} /> : <span>{title}</span>}
      </div>
    </div>
  );
});

// const Header: React.FC<IHeaderProps> = (props) => {
//   const { title, handleClick, rolling, style, className } = props;
//   const classes = classNames('header-container', className);
//   return (
//     <div className={classes} onClick={() => handleClick()} style={style}>
//       <Icon className="header-back" icon="chevron-left" />
//       <div className="title-wrapper">
//         {rolling ? <Marquee text={title} /> : <span>{title}</span>}
//       </div>
//     </div>
//   );
// };

export default React.memo(Header);
