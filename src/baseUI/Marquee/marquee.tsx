/*
 * @Date: 2021-11-23 10:42:32
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-29 15:13:41
 * @Description:
 * @FilePath: \melodia-ts\src\baseUI\Marquee\marquee.tsx
 */
import classNames from 'classnames';
import React from 'react';

interface IMarqueeProps {
  text: string;
  direction?: string;
  behavior?: string;
  className?: string;
}

const Marquee: React.FC<IMarqueeProps> = (props) => {
  const { text, className } = props;
  const classes = classNames('marquee-container', className);
  return (
    <div className={classes}>
      <div className="marquee-text">{text}</div>
    </div>
  );
};

export default Marquee;
