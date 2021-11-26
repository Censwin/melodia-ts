/*
 * @Date: 2021-11-24 15:32:17
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-26 18:19:25
 * @Description: 排行榜
 * @FilePath: \melodia-ts\src\application\Rank\index.tsx
 */
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router';
import { Header, Scroll } from '../../baseUI';
import * as ActionType from './store/constans';
import { IApplicationState } from '../../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { filterRankList } from '../../utils/tools';
import { Card, Icon } from '../../components';
import LazyLoad, { forceCheck } from 'react-lazyload';
import defaultImg from './../../assets/img/defaultmusic.png';

const Rank = () => {
  const [showStatus, setShowStatus] = useState(true);
  const history = useHistory();
  const nodeRef = useRef(null);
  const dispatch = useDispatch();
  const { rankList } = useSelector((state: IApplicationState) => state.Rank);
  type ScrollComponentType = React.ElementRef<typeof Scroll>;
  const ScrollRef = useRef<ScrollComponentType>(null);
  useEffect(() => {
    dispatch({ type: ActionType.GET_RANKLIST });
  }, []);

  const [officialList, choicenessList, musicstyleList, globalList, specialList] = useMemo(() => {
    return filterRankList(rankList);
  }, [rankList.length]);
  useEffect(() => {
    ScrollRef.current?.refresh();
  });
  const enterDetail = useCallback((id) => {
    history.push(`/album/${id}`);
  }, []);
  const renderSongList = useCallback(
    (list) => (
      <ul className="song-list-wrapper">
        {list.map((item: any, index: number) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} <span className="singer-name"> — {item.second}</span>
            </li>
          );
        })}
      </ul>
    ),
    [rankList.length]
  );
  const RenderOfficial = useCallback(
    () => (
      <ul className="official-wrapper">
        {officialList.map((item) => {
          return (
            <li key={item.id} className="official-item" onClick={() => enterDetail(item.id)}>
              <div className="img_wrapper">
                <LazyLoad placeholder={<img width="100%" height="100%" src={defaultImg} />}>
                  <img src={item.coverImgUrl} alt="" />
                </LazyLoad>
              </div>
              <span className="update_frequecy">{item.updateFrequency}</span>
              {renderSongList(item.tracks)}
            </li>
          );
        })}
      </ul>
    ),
    [rankList.length]
  );
  const RenderRankList = useCallback(
    (list) => (
      <ul className="rank-list-wrapper">
        {list.map((item: any) => {
          return (
            <li key={item.id} className="rank-item" onClick={() => enterDetail(item.id)}>
              <LazyLoad placeholder={<img width="100%" height="100%" src={defaultImg} />}>
                <img src={item.coverImgUrl} alt="" />
              </LazyLoad>
              <div className="decorate" />
              <span className="update_frequecy">{item.updateFrequency}</span>
              <Icon className="playicon" icon="play" />
              <p className="rank-name">{item.name}</p>
            </li>
          );
        })}
      </ul>
    ),
    [rankList.length]
  );
  return (
    <CSSTransition
      in={showStatus}
      appear={true}
      classNames="common-fade"
      timeout={300}
      unmountOnExit
      onExited={history.goBack}
      nodeRef={nodeRef}
    >
      <div className="rank-container" ref={nodeRef}>
        <Header
          style={{ background: '#fff' }}
          title="排行榜"
          handleClick={() => setShowStatus(false)}
        />
        <section className="scroll-window-wrapper">
          <Scroll ref={ScrollRef} onScroll={forceCheck}>
            <div>
              <div className="official-title">
                <Icon icon="music" />
                官方榜
              </div>
              {RenderOfficial()}
              <Card title="精选榜">{RenderRankList(choicenessList)}</Card>
              <Card title="曲风榜">{RenderRankList(musicstyleList)}</Card>
              <Card title="全球榜">{RenderRankList(globalList)}</Card>
              <Card title="特色榜">{RenderRankList(specialList)}</Card>
            </div>
          </Scroll>
        </section>
      </div>
    </CSSTransition>
  );
};

export default React.memo(Rank);
