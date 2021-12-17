/*
 * @Date: 2021-11-29 14:27:08
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-13 14:21:01
 * @Description:
 * @FilePath: \melodia-ts\src\application\Player\component\playList.tsx
 */
import React, { useRef, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Scroll } from '../../../baseUI';
import animations from 'create-keyframe-animation';
import { prefixStyle, getName } from '../../../utils/tools';
import { Icon } from '../../../components';
import classNames from 'classnames';
interface IPlayListProps {
  showPlayList: boolean;
  toggleShowPlayList: Function;
  playList: any[];
  playmodeText: string;
  currentIndex: number;
  changeCurrentIndex: Function;
  handleDeleteSong: Function;
}
const PlayList: React.FC<IPlayListProps> = (props) => {
  const { showPlayList, playList, playmodeText, currentIndex } = props;
  const { toggleShowPlayList, changeCurrentIndex, handleDeleteSong } = props;
  const playListWrapperRef = useRef<HTMLElement>(document.createElement('div'));
  const decorateRef = useRef<HTMLDivElement>(null);
  const playListRef = useRef<HTMLUListElement>(document.createElement('ul'));
  const transform = prefixStyle('transform');

  const EnterAnimation = () => {
    playListWrapperRef.current.style.display = 'block';
    let animation = {
      0: {
        transform: `translate3d(0, 100%, 0) scale(0.8)`
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`
      }
    };
    animations.registerAnimation({
      name: 'pushup',
      animation,
      presets: {
        duration: 400,
        easing: 'linear'
      }
    });
    animations.runAnimation(playListRef.current, 'pushup');
  };

  const afterEnter = () => {
    animations.unregisterAnimation('move');
    playListRef.current.style.animation = '';
  };

  const leaveAnimation = () => {
    playListRef.current.style.transition = `all 0.4s`;
    playListRef.current.style[transform as any] = `translate3d(0, 100%, 0)`;
  };

  const afterLeave = () => {
    playListRef.current.style.transition = '';
    playListRef.current.style[transform as any] = '';
    playListWrapperRef.current.style.display = 'none';
  };

  const RenderList = useCallback(() => {
    return playList.map((item: any, index: number) => {
      const liClass = classNames({
        isSelect: currentIndex === index
      });
      return (
        <li key={item.id} data-value={index} className={liClass}>
          <span className="index">{index + 1}</span>
          <div className="song-item">
            <span className="song-name">{item.name}</span>
            <span className="singer-name">
              {getName(item.ar)} - {item.al.name}
            </span>
          </div>
          <div className="del-btn" onClick={(e) => handleDeleteSong(e, item)}>
            <Icon icon="trash-alt" />
          </div>
        </li>
      );
    });
  }, [playList, currentIndex]);

  useEffect(() => {
    if (!decorateRef.current) return;
    function foo() {
      toggleShowPlayList(false);
    }
    decorateRef.current.addEventListener('click', foo);
    return () => {
      if (decorateRef.current) {
        decorateRef.current.removeEventListener('click', foo);
      }
    };
  });

  const handleClickSong = (e: React.MouseEvent) => {
    let target = e.target as HTMLElement;
    while (target.nodeType === 1 && target.tagName !== 'LI') {
      target = target.parentNode as HTMLElement;
    }
    changeCurrentIndex(Number(target.getAttribute('data-value')));
  };

  return (
    <CSSTransition
      in={showPlayList}
      classNames="playlist-fade"
      nodeRef={playListWrapperRef}
      timeout={400}
      mountOnEnter
      onEnter={EnterAnimation}
      onEntered={afterEnter}
      onExit={leaveAnimation}
      onExited={afterLeave}
    >
      <section className="playlist-container" ref={playListWrapperRef}>
        <div className="modal-decorate" ref={decorateRef} />
        <div className="playlist-scroll">
          <Scroll>
            <ul className="list-wrapper" ref={playListRef} onClick={(e) => handleClickSong(e)}>
              <p>{playmodeText}</p>
              {RenderList()}
            </ul>
          </Scroll>
        </div>
      </section>
    </CSSTransition>
  );
};

export default React.memo(PlayList);
