/*
 * @Date: 2021-11-19 16:54:40
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-29 15:31:31
 * @Description: 歌单 与 专辑 详情页
 * @FilePath: \melodia-ts\src\application\Album\index.tsx
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useHistory, useParams } from 'react-router';
import { CommonSongList, Header, Marquee, Scroll } from '../../baseUI';
import { Icon } from '../../components';
import { getCount, getName, isEmptyObject } from '../../utils/tools';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../store/reducers';
import * as ActionType from './store/constants';
import * as PlayerType from './../Player/store/constans';
import MusicNote from '../../baseUI/musicNote';

const Album: React.FC = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const { currentAlbum } = useSelector((state: IApplicationState) => state.Album);
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState('歌单');
  const [isRolling, setIsRolling] = useState(false);
  const [descRolling, setDescRolling] = useState(false);
  const handleExit = () => {};
  const nodeRef = useRef(null);
  useEffect(() => {
    dispatch({ type: ActionType.GET_ALBUMDETAIL, payload: params });
  }, [params]);
  // if (!currentAlbum.tracks) return <i>{}</i>;
  const {
    coverImgUrl,
    name,
    creator,
    description,
    subscribedCount,
    commentCount,
    shareCount,
    tracks
  } = currentAlbum;

  const handleSelectSong = (event: React.MouseEvent, item: any) => {
    dispatch({ type: PlayerType.ADD_CURRENT_SONG, payload: item });
  };

  const handlePlayAll = () => {
    dispatch({ type: PlayerType.ADD_CURRENT_SONG, payload: tracks });
  };

  const RenderTopInfo = useCallback(
    () => (
      <section className="top-desc-wrapper">
        <div className="info-wrapper">
          <article className="info-left">
            <img className="cover-pic" src={coverImgUrl} />
            <div className="play-count">
              <Icon icon="play" />
              {getCount(subscribedCount)}
            </div>
          </article>
          <article className="info-right">
            <p className="album-title">{name}</p>
            <article className="creator">
              <div className="avatar">
                <img src={creator.avatarUrl} />
              </div>
              <div className="creator-name">{creator.nickname}</div>
              <div className="description">
                {descRolling ? (
                  <Marquee text={description} />
                ) : (
                  <span onClick={() => setDescRolling(true)}>{description}</span>
                )}
              </div>
            </article>
          </article>
        </div>
      </section>
    ),
    [currentAlbum, descRolling]
  );
  const RenderControlBar = useCallback(
    () => (
      <section className="control-bar-wrapper">
        <div className="control-bar">
          <span>
            <Icon icon="plus-square" />
            <i>{subscribedCount}</i>
          </span>
          |
          <span>
            <Icon icon="comment-dots" />
            <i>{commentCount}</i>
          </span>
          |
          <span>
            <Icon icon="share-square" />
            <i>{shareCount}</i>
          </span>
        </div>
      </section>
    ),
    [currentAlbum]
  );
  const RenderSongList = useCallback(
    () => (
      <CommonSongList
        songs={tracks}
        onClickCallback={handleSelectSong}
        showPlayAll={true}
        onClickPlayAll={handlePlayAll}
      />
    ),
    [currentAlbum]
  );
  return (
    <CSSTransition
      in={showStatus}
      appear={true}
      classNames="common-fadeInUp"
      timeout={300}
      unmountOnExit
      onExited={history.goBack}
      nodeRef={nodeRef}
    >
      <div className="album-container" ref={nodeRef}>
        <div className="bg-decorate" />
        <Header
          style={{ color: '#fff' }}
          title={title}
          handleClick={(_: any) => setShowStatus(false)}
          rolling={isRolling}
        />
        {!isEmptyObject(currentAlbum) && (
          <>
            <div className="background" style={{ backgroundImage: `url(${coverImgUrl})` }} />
            <div className="scroll-window-wrapper">
              <Scroll>
                <div>
                  {RenderTopInfo()}
                  {RenderControlBar()}
                  {RenderSongList()}
                </div>
              </Scroll>
            </div>
          </>
        )}
      </div>
    </CSSTransition>
  );
};

export default React.memo(Album);
