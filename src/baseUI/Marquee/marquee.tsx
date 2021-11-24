/*
 * @Date: 2021-11-23 10:42:32
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-23 10:59:57
 * @Description:
 * @FilePath: \melodia-ts\src\baseUI\Marquee\marquee.tsx
 */
import React from 'react';

interface IMarqueeProps {
  text: string;
  direction?: string;
  behavior?: string;
}

const Marquee: React.FC<IMarqueeProps> = (props) => {
  const { text } = props;
  return (
    <div className="marquee-container">
      <div className="marquee-text">{text}</div>
    </div>
  );
};

export default Marquee;
