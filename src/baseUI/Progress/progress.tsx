/*
 * @Date: 2021-11-30 15:51:53
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-30 18:00:38
 * @Description:
 * @FilePath: \melodia-ts\src\baseUI\Progress\progress.tsx
 */
import React, { useRef, useEffect } from 'react';
import { prefixStyle } from '../../utils/tools';

export interface IProgressProps {
  percent: number;
  percentChange: Function;
}

const Progress: React.FC<IProgressProps> = (props) => {
  const { percent } = props;
  const { percentChange } = props;
  const progressBar = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const progressBtn = useRef<HTMLDivElement>(null);
  const transform = prefixStyle('transform');
  useEffect(() => {
    if (!progressBar.current || !progress.current || !progressBtn.current) return;
    const barwidth = progressBar.current?.clientWidth;
    const offsetWidth = (percent / 100) * barwidth;
    progress.current.style.width = offsetWidth + 'px';
    progressBtn.current.style[transform as any] = `translate3d(${offsetWidth}px, 0, 0)`;
  }, [percent]);
  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {};
  const handleTouchMove = (event: React.TouchEvent<HTMLElement>) => {};
  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {};
  return (
    <section className="progress-bar">
      <div className="bar-inner" ref={progressBar}>
        <div className="progress" ref={progress} />
        <div
          className="progress-btn-wrapper"
          ref={progressBtn}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="progress-btn" />
        </div>
      </div>
    </section>
  );
};
Progress.defaultProps = {
  percent: 50
};
export default React.memo(Progress);
