/*
 * @Date: 2021-11-29 14:29:06
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-01 17:47:48
 * @Description:
 * @FilePath: \melodia-ts\src\application\Player\component\normalPlayer.tsx
 */
import classNames from 'classnames';
import React, { useRef, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Marquee, Progress } from '../../../baseUI';
import { Icon } from '../../../components';
import { formatPlayTime, getName, prefixStyle } from '../../../utils/tools';
import animations from 'create-keyframe-animation';

interface INplayerProps {
  song: any;
  isFullScreen: boolean;
  toggleFullScreen: Function;
  playing: boolean;
  handleClickPlay: Function;
  ProgressPercent: number;
  currentTime: number;
  durationTime: number;
  onProgressChange: Function;
  lastSong: Function;
  nextSong: Function;
}

const NormalPlayer: React.FC<INplayerProps> = (props) => {
  const { song, isFullScreen, playing, ProgressPercent, currentTime, durationTime } = props;
  const { toggleFullScreen, handleClickPlay, onProgressChange, lastSong, nextSong } = props;
  const normalPlayerRef = useRef<HTMLElement>(null);
  const cdWrapperRef = useRef<HTMLElement>(null);
  const transform = prefixStyle('transform');

  const CD_PIC_CLASSES = classNames('cd-image', {
    play: playing,
    pause: !playing
  });
  const getMoveDistance = useCallback(() => {
    // 获取小圆到大圆中心到中心点的距离
    // 只考虑Y轴运动
    const vw2px = document.documentElement.clientWidth / 100;
    // const smallCDWidth = 16 * vw2px;
    const smallCDHeight = 16 * vw2px;
    // const smallCDoffsetLeft = 42 * vw2px;
    const smallCDoffsetBottom = 6 * vw2px;
    // 大CD高度
    const bigCDHeight = 82 * vw2px;
    const bigCDTop = 40 * vw2px;
    // 计算Y轴移动距离
    const y =
      window.innerHeight -
      smallCDHeight / 2 -
      smallCDoffsetBottom -
      bigCDHeight / 2 -
      bigCDTop +
      30 * vw2px;
    const scale = smallCDHeight / bigCDHeight; // 缩放比例
    return {
      y,
      scale
    };
  }, []);
  const enterAnimation = useCallback(() => {
    if (normalPlayerRef.current) {
      normalPlayerRef.current.style.display = 'block';
      const { y, scale } = getMoveDistance();
      let animation = {
        0: {
          transform: `translate3d(0, ${y}px, 0) scale(${scale})`
        },
        80: {
          transform: `translate3d(0,-50px,0) scale(1.2)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      };
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      });
      animations.runAnimation(cdWrapperRef.current, 'move');
    }
  }, []);
  const afterEnter = useCallback(() => {
    // 进入后解绑
    animations.unregisterAnimation('move');
    if (cdWrapperRef.current) cdWrapperRef.current.style.animation = '';
  }, []);

  const leaveAnimation = useCallback(() => {
    if (!cdWrapperRef.current) return;
    const { y, scale } = getMoveDistance();
    cdWrapperRef.current.style.transition = `all 0.4s`;
    cdWrapperRef.current.style[transform as any] = `translate3d(0, ${y}px, 0) scale(${scale})`;
  }, []);
  const afterLeave = useCallback(() => {
    if (!cdWrapperRef.current || !normalPlayerRef.current) return;
    cdWrapperRef.current.style.transition = '';
    cdWrapperRef.current.style[transform as any] = '';
    normalPlayerRef.current.style.display = 'none';
  }, []);
  const changeProgressCallBack = (percent: number) => {
    onProgressChange(percent);
  };
  return (
    <CSSTransition
      in={isFullScreen}
      classNames="page-up"
      timeout={400}
      mountOnEnter
      nodeRef={normalPlayerRef}
      onEnter={enterAnimation}
      onEntered={afterEnter}
      onExit={leaveAnimation}
      onExited={afterLeave}
    >
      <section className="normal-player-container" ref={normalPlayerRef}>
        <div className="player-background">
          <img src={song.al.picUrl + '?param=300x300'} width="100%" height="100%" />
        </div>
        <div className="bg-decorate" />
        <article className="player-header">
          <span className="close-btn" onClick={() => toggleFullScreen(false)}>
            <Icon icon="chevron-down" />
          </span>
          <div className="title-wrapper">
            <Marquee className="title" text={song.name} />
            <p className="subtitle">{getName(song.ar)}</p>
          </div>
        </article>
        <article className="player-middle" ref={cdWrapperRef}>
          <div className="cd-wrapper">
            <div className="img-wrapper">
              <img className={CD_PIC_CLASSES} src={song.al.picUrl + '?param=400x400'} alt="" />
            </div>
          </div>
        </article>
        <article className="player-bottom">
          <div className="time-line-wrapper">
            <span>{formatPlayTime(currentTime)}</span>
            <div className="progress-wrapper">
              <Progress percent={ProgressPercent} percentChange={changeProgressCallBack} />
            </div>
            <span>{formatPlayTime(durationTime)}</span>
          </div>
          <div className="player-control-bar">
            <span>
              <Icon icon="random" />
            </span>
            <span>
              <Icon icon="step-backward" onClick={() => lastSong()} />
            </span>
            <span onClick={(e) => handleClickPlay(!playing)}>
              {playing ? <Icon icon="pause" /> : <Icon icon="play" />}
            </span>
            <span>
              <Icon icon="step-forward" onClick={() => nextSong()} />
            </span>
            <span>
              <Icon icon="stream" />
            </span>
          </div>
        </article>
      </section>
    </CSSTransition>
  );
};

export default React.memo(NormalPlayer);
