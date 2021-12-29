/*
 * @Date: 2021-12-27 10:00:34
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-29 15:33:32
 * @Description:
 * @FilePath: \melodia-ts\src\application\Singer\index.tsx
 */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import { CommonSongList, Header, Scroll } from '../../baseUI';
import { IApplicationState } from '../../store/reducers';
import { isEmptyObject, prefixStyle } from '../../utils/tools';
import * as ActionType from './store/constants';
import * as PlayerType from './../Player/store/constans';

const Singer: React.FC = () => {
  const [showStatus, setShowStatus] = useState(true);
  const history = useHistory();
  interface Iparams {
    id: string;
  }
  const params = useParams<Iparams>();
  const dispatch = useDispatch();
  const { artist, songsOfArtist } = useSelector((state: IApplicationState) => state.Singer);
  const containerRef = useRef(null);
  const imgWrapperRef = useRef<HTMLElement>(null);
  const songsWrapperRef = useRef<HTMLElement>(null);
  type ScrollType = React.ElementRef<typeof Scroll>;
  const scrollRef = useRef<ScrollType>(null);
  const initHeight = useRef(0);
  const layerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<React.ElementRef<typeof Header>>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;
  const transform = prefixStyle('transform');
  useEffect(() => {
    dispatch({ type: ActionType.GET_SINGER, payload: { id: params.id } });
  }, []);
  useEffect(() => {
    if (imgWrapperRef.current && songsWrapperRef.current && layerRef.current && scrollRef.current) {
      let h = imgWrapperRef.current.offsetHeight;
      songsWrapperRef.current.style.top = `${h - OFFSET}px`;
      initHeight.current = h;
      layerRef.current.style.top = `${h - OFFSET}px`;
      scrollRef.current.refresh();
    }
  }, [songsOfArtist]);

  const handleScroll = useCallback((pos: { y: number }) => {
    if (
      imgWrapperRef.current &&
      songsWrapperRef.current &&
      layerRef.current &&
      scrollRef.current &&
      headerRef.current &&
      infoRef.current
    ) {
      let height = initHeight.current;
      const newY = pos.y;
      const percent = Math.abs(newY / height);
      const minScrollTop = -(height - OFFSET) + headerRef.current.offsetHeight;
      if (newY > 0) {
        // 向下拉
        imgWrapperRef.current.style[transform as any] = `scale(${1 + percent})`;
        layerRef.current.style.top = `${height - OFFSET + newY}px`;
      } else if (newY >= minScrollTop) {
        layerRef.current.style.top = `${height - OFFSET + newY}px`;
        imgWrapperRef.current.style.paddingTop = '75%';
        imgWrapperRef.current.style.height = `0`;
        imgWrapperRef.current.style.zIndex = '1';
        if (newY >= minScrollTop + infoRef.current.clientHeight) {
          infoRef.current.style[transform as any] = `translate3d(0, ${newY}px, 0)`;
          infoRef.current.style['opacity'] = `${1 - percent}`;
        }
      } else if (newY < minScrollTop) {
        // 超过Header
        imgWrapperRef.current.style.height = `${headerRef.current.offsetHeight}px`;
        imgWrapperRef.current.style.paddingTop = '0';
        imgWrapperRef.current.style.zIndex = '100';
      }
    }
  }, []);

  const handleClickSong = (event: React.MouseEvent, item: any) => {
    dispatch({ type: PlayerType.ADD_CURRENT_SONG, payload: item });
  };
  const handlePlayAll = () => {
    dispatch({ type: PlayerType.ADD_CURRENT_SONG, payload: songsOfArtist });
  };
  return (
    <CSSTransition
      nodeRef={containerRef} // TRG issue 668
      in={showStatus}
      timeout={300}
      classNames="common-fadeInUp"
      unmountOnExit
      appear={true}
      onExited={history.goBack}
    >
      <section className="singer-container">
        <Header
          title=""
          className="singer-header"
          handleClick={() => setShowStatus(false)}
          ref={headerRef}
        />
        <article
          className="img-wrapper"
          style={{ backgroundImage: `url(${artist.picUrl}?param=300x300)` }}
          ref={imgWrapperRef}
        >
          <div className="filter" />
          <div className="singer-info" ref={infoRef}>
            <div className="info-left">
              <h1>{artist.name}</h1>
              <p>175.5 万 粉丝</p>
            </div>
            <div>
              <span className="mark-btn">关注</span>
            </div>
          </div>
        </article>
        <article className="Bglayer" ref={layerRef} />
        <article className="SingerSongwrapper" ref={songsWrapperRef}>
          <Scroll ref={scrollRef} onScroll={handleScroll}>
            <CommonSongList
              songs={songsOfArtist}
              onClickCallback={handleClickSong}
              showPlayAll={true}
              onClickPlayAll={handlePlayAll}
            />
          </Scroll>
        </article>
      </section>
    </CSSTransition>
  );
};

export default Singer;
