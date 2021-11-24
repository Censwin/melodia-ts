/*
 * @Date: 2021-11-19 16:54:40
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-24 14:48:18
 * @Description: 歌单 与 专辑 详情页
 * @FilePath: \melodia-ts\src\application\Album\index.tsx
 */
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useHistory, useParams } from 'react-router';
import { Header, Marquee, Scroll } from '../../baseUI';
import { Icon } from '../../components';
import { getCount, getName, isEmptyObject } from '../../utils/tools';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../store/reducers';
import * as ActionType from './store/constants';

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
      <div className="album-container" ref={nodeRef}>
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
                  <div className="top-desc-wrapper">
                    <section className="info-wrapper">
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
                    </section>
                  </div>
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
                  <section className="song-list">
                    <article className="first-line">
                      <div className="play-all">
                        <span className="playicon">
                          <Icon icon="play-circle" />
                        </span>
                        <span>
                          {' '}
                          播放全部 <span className="sum">({tracks.length})</span>
                        </span>
                      </div>
                    </article>
                    <ul className="songs-wrapper">
                      {tracks.map((item: any, index: number) => {
                        return (
                          <li key={item.name + index}>
                            <span className="index">{index + 1}</span>
                            <div className="song-item">
                              <span className="song-name">{item.name}</span>
                              <span className="singer-name">
                                <Icon icon="h-square" />
                                {getName(item.ar)} - {item.al.name}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                </div>
              </Scroll>
            </div>
          </>
        )}
      </div>
    </CSSTransition>
  );
};

export default Album;
