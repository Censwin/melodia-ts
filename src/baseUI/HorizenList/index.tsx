/*
 * @Date: 2021-11-18 10:11:09
 * @LastEditTime: 2021-11-18 10:44:25
 * @LastEditors: Please set LastEditors
 * @Description: 横向滚动组件， 注意每一个需要被render的item的根节点都需加上类名: horizen-item
 * @FilePath: \melodia-ts\src\baseUI\HorizenList\index.tsx
 */
import React, { useCallback, useEffect, useRef } from 'react';
import Scroll from '../Scroll/scroll';

const HorizenList: React.FC = (props) => {
  type ScrollComponentType = React.ElementRef<typeof Scroll>;
  const HorizenWrapperRef = useRef<HTMLElement & HTMLDivElement>(null);
  const HorizenScrollRef = useRef<ScrollComponentType>(null);
  useEffect(() => {
    let Dom = HorizenWrapperRef.current as HTMLElement;
    let items = Dom.querySelectorAll<HTMLElement>('.horizen-item');
    let totalWidth = 0;
    Array.from(items).forEach((e) => {
      totalWidth += e.offsetWidth;
    });
    Dom.style.width = `${totalWidth + 100}px`;
    HorizenScrollRef.current?.refresh();
  });
  return (
    <Scroll ref={HorizenScrollRef} direction="horizental">
      <div ref={HorizenWrapperRef}>{props.children}</div>
    </Scroll>
  );
};

export default HorizenList;
