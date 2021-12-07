/*
 * @Date: 2021-11-30 15:51:53
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-01 17:04:10
 * @Description:
 * @FilePath: \melodia-ts\src\baseUI\Progress\progress.tsx
 */
import React, { useRef, useEffect, useState } from 'react';
import { prefixStyle } from '../../utils/tools';

export interface IProgressProps {
  percent: number;
  percentChange: Function;
}

interface ITouchInfo {
  startedTouch: boolean;
  startX: number;
  passed: number;
}

const Progress: React.FC<IProgressProps> = (props) => {
  const { percent } = props;
  const { percentChange } = props;
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBtnRef = useRef<HTMLDivElement>(null);
  const [TouchInfo, setTouchInfo] = useState<ITouchInfo>();
  const transform = prefixStyle('transform');

  useEffect(() => {
    if (!progressBarRef.current || !progressRef.current || !progressBtnRef.current) return;
    const barwidth = progressBarRef.current?.clientWidth;
    const offsetWidth = percent * barwidth;
    progressRef.current.style.width = offsetWidth + 'px';
    progressBtnRef.current.style[transform as any] = `translate3d(${
      offsetWidth - progressBtnRef.current.clientWidth / 2
    }px, 0, 0)`;
  }, [percent]);

  const updateTheProgress = (distance: number) => {
    if (!progressRef.current || !progressBtnRef.current) return;
    progressRef.current.style.width = distance + 'px';
    progressBtnRef.current.style[transform as any] = `translate3d(${distance}px, 0,0)`;
  };

  const sendNewProgressData = () => {
    if (!progressBarRef.current || !progressBtnRef.current || !progressRef.current) return;
    const barWidth = progressBarRef.current.clientWidth - progressBtnRef.current.clientWidth;
    const newPercent = progressRef.current.clientWidth / barWidth;
    percentChange(newPercent);
  };

  const handleClickProgress = (event: React.MouseEvent<HTMLElement>) => {
    if (!progressBarRef.current) return;
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
    const domRect = progressBarRef.current.getBoundingClientRect();
    const distance = event.pageX - domRect.left;
    updateTheProgress(distance);
    sendNewProgressData();
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    let touchObj: ITouchInfo = {
      startedTouch: true,
      startX: event.touches[0].pageX,
      passed: progressRef.current?.clientWidth || 0
    };
    setTouchInfo(touchObj);
    sendNewProgressData();
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLElement>) => {
    if (!TouchInfo?.startedTouch) return;
    if (!progressBarRef.current || !progressBtnRef.current) return;
    const DeltaX = event.touches[0].pageX - TouchInfo.startX;
    const barWidth = progressBarRef.current.clientWidth - progressBtnRef.current.clientWidth;
    const distance = Math.min(Math.max(0, TouchInfo.passed + DeltaX), barWidth);
    updateTheProgress(distance);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    const newTouchInfo = { ...TouchInfo };
    newTouchInfo.startedTouch = false;
    setTouchInfo(newTouchInfo as ITouchInfo);
    sendNewProgressData();
  };

  return (
    <section className="progress-bar">
      <div className="bar-inner" ref={progressBarRef} onClick={handleClickProgress}>
        <div className="progress" ref={progressRef} />
        <div
          className="progress-btn-wrapper"
          ref={progressBtnRef}
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

export default React.memo(Progress);
