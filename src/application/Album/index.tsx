/*
 * @Date: 2021-11-19 16:54:40
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-23 17:33:17
 * @Description: 歌单 与 专辑 详情页
 * @FilePath: \melodia-ts\src\application\Album\index.tsx
 */
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router';
import { Header, Scroll } from '../../baseUI';
import { currentAlbum } from './temp';
import { Icon } from '../../components';
import { getCount, getName } from '../../utils/tools';

const Album: React.FC = () => {
  const history = useHistory();
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState('歌单');
  const [isRolling, setIsRolling] = useState(false);
  const handleExit = () => {};
  return (
    <CSSTransition
      in={showStatus}
      appear={true}
      classNames="common-fade"
      timeout={300}
      unmountOnExit
      onExited={history.goBack}
    >
      <div className="album-container">
        <Header
          style={{ color: '#fff' }}
          title={title}
          handleClick={(_: any) => setShowStatus(false)}
          rolling={isRolling}
        />
        <div
          className="background"
          style={{ backgroundImage: `url(${currentAlbum.coverImgUrl})` }}
        />
        <div className="scroll-window-wrapper">
          <Scroll>
            <div>
              <div className="top-desc-wrapper">
                <section className="info-wrapper">
                  <article className="info-left">
                    <img className="cover-pic" src={currentAlbum.coverImgUrl} />
                    <div className="play-count">
                      <Icon icon="play" />
                      {getCount(currentAlbum.subscribedCount)}
                    </div>
                  </article>
                  <article className="info-right">
                    <p className="album-title">{currentAlbum.name}</p>
                    <article className="creator">
                      <div className="avatar">
                        <img src={currentAlbum.creator.avatarUrl} />
                      </div>
                      <div className="creator-name">{currentAlbum.creator.nickname}</div>
                    </article>
                  </article>
                </section>
              </div>
              <section className="control-bar-wrapper">
                <div className="control-bar">
                  <span>
                    <Icon icon="plus-square" />
                    <i>87879</i>
                  </span>
                  |
                  <span>
                    <Icon icon="comment-dots" />
                    <i>87879</i>
                  </span>
                  |
                  <span>
                    <Icon icon="share-square" />
                    <i>87879</i>
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
                      播放全部 <span className="sum">({currentAlbum.tracks.length})</span>
                    </span>
                  </div>
                </article>
                <ul className="songs-wrapper">
                  {currentAlbum.tracks.map((item, index) => {
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
      </div>
    </CSSTransition>
  );
};

export default Album;
