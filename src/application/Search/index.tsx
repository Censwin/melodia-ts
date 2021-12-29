/*
 * @Date: 2021-12-09 17:18:49
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-29 16:56:07
 * @Description:
 * @FilePath: \melodia-ts\src\application\Search\index.tsx
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import { CommonPlaylist, CommonSongList, Scroll } from '../../baseUI';
import { Icon } from '../../components';
import { IApplicationState } from '../../store/reducers';
import { isEmptyObject } from '../../utils/tools';
import Filter from './component/filter';
import * as ActionType from './store/constants';
import Tabs from '../../components/Tabs';
import LazyLoad from 'react-lazyload';
import defaultImg from './../../assets/img/defaultmusic.png';

const Search = () => {
  const [showState, setShowState] = useState(true);
  const nodeRef = useRef(null);
  const history = useHistory();
  const [showHotkey, setShowHotkey] = useState(true);
  const [HotKey, setHotKey] = useState('');
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('');
  const { hotKeyList, suggestObject, songsList, enterLoading } = useSelector(
    (state: IApplicationState) => state.Search
  );
  type ScrollComponentType = React.ElementRef<typeof Scroll>;
  const ScrollRef = useRef<ScrollComponentType>(null);

  useEffect(() => {
    dispatch({ type: ActionType.GET_HOT_KEYWRODS });
  }, []);

  useEffect(() => {
    ScrollRef.current?.refresh();
  }, [songsList]);

  const handleCancel = useCallback(() => {
    setShowState(false);
  }, []);

  const onExited = () => {
    history.goBack();
    dispatch({ type: ActionType.CLEAR_DATA });
  };

  const handleSearch = useCallback((val: string) => {
    dispatch({ type: ActionType.SEARCH_KEYWORD, payload: val });
  }, []);

  const FilterProps = {
    handleCancel,
    handleSearch,
    setShowHotkey,
    HotKey
  };

  const handleClickHotkey = (e: React.MouseEvent) => {
    let target = e.target as HTMLElement;
    while (target.nodeType === 1 && target.tagName !== 'LI') {
      target = target.parentNode as HTMLElement;
    }
    const text = target.querySelector('span')?.innerText || '';
    setHotKey(text);
    handleSearch(text);
  };

  const handleChangePannel = (key: string) => {
    setSelectedOption(key);
  };

  const enterDetail = useCallback((id) => {
    history.push(`/album/${id}`);
  }, []);

  const handleSelectSong = (event: React.MouseEvent, item: any) => {
    dispatch({ type: 'player/GET_SONG_DETAIL', payload: item.id });
  };

  // ===========================Render================================

  const renderHotKeys = useCallback(() => {
    if (showHotkey) {
      return (
        <>
          <h3 style={{ textIndent: '1em' }}>热搜榜</h3>
          <ul className="hotkey-wrapper" onClick={handleClickHotkey}>
            {hotKeyList.length > 0 &&
              hotKeyList.map(({ first }, index: number) => {
                return (
                  <li key={first}>
                    <i>{index + 1}</i>
                    <span>{first}</span>
                  </li>
                );
              })}
          </ul>
        </>
      );
    }
  }, [hotKeyList, showHotkey]);

  const RenderSongs = useCallback(() => {
    return (
      <div className="scroll-w-wrapper">
        <Scroll ref={ScrollRef}>
          <CommonSongList songs={songsList} onClickCallback={handleSelectSong} showNum={false} />
        </Scroll>
      </div>
    );
  }, [songsList]);

  const RenderPlayList = useCallback(() => {
    return (
      <CommonPlaylist
        data={suggestObject.playlists ? suggestObject.playlists : []}
        onClickCallback={enterDetail}
      />
    );
  }, [suggestObject.playlists]);

  const RenderSingers = useCallback(() => {
    let singers = suggestObject.artists;
    if (!singers || !singers.length) {
      return <h1>暂无数据</h1>;
    }
    return (
      <div className="singer-wrapper">
        {singers.map((item, index) => {
          return (
            <div
              className="singer-item"
              key={index}
              onClick={() => history.push(`/singers/${item.id}`)}
            >
              <div className="singer-left">
                <div className="img_wrapper">
                  <LazyLoad
                    placeholder={<img width="100%" height="100%" src={defaultImg} alt="singer" />}
                  >
                    <img
                      src={item.picUrl + '?param=300x300'}
                      width="100%"
                      height="100%"
                      alt="music"
                    />
                  </LazyLoad>
                </div>
                <span className="name"> 歌手: {item.name}</span>
              </div>
              <div className="singer-right">
                <Icon icon="chevron-right" />
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [suggestObject.artists]);

  const RenderAlbums = useCallback(() => {
    if (suggestObject.albums) {
      return (
        <div style={{ padding: '0 15%' }}>
          {suggestObject.albums.map((item: any, index: number) => {
            const direction = index % 2 ? 'right' : 'left';
            return (
              <h2 key={item.id} style={{ textAlign: direction }}>
                {item.name}
              </h2>
            );
          })}
        </div>
      );
    }
  }, [suggestObject.albums]);

  const renderContent = useCallback(
    (option: string) => {
      switch (option) {
        case '歌曲':
          return RenderSongs();
        case '歌手':
          return RenderSingers();
        case '歌单':
          return RenderPlayList();
        case '专辑':
          return RenderAlbums();
        default:
          return <h1 style={{ textAlign: 'center' }}>功能开发中</h1>;
      }
    },
    [selectedOption, songsList, suggestObject]
  );

  const renderResult = useCallback(() => {
    if (isEmptyObject(suggestObject)) return null;
    if (!suggestObject.order) return null;
    if (showHotkey) return null;
    return (
      <article className="result-wrapper">
        <Tabs onTabClick={handleChangePannel}>
          {suggestObject.order.map((item) => {
            return (
              <Tabs.Item label={item} key={item}>
                {renderContent(item)}
              </Tabs.Item>
            );
          })}
        </Tabs>
      </article>
    );
  }, [songsList, songsList.length, suggestObject, suggestObject.order, showHotkey]);

  return (
    <CSSTransition
      in={showState}
      appear={true}
      classNames="common-fadeInUp"
      timeout={300}
      unmountOnExit
      onExited={onExited}
      nodeRef={nodeRef}
    >
      <section className="search-container" ref={nodeRef}>
        <Filter {...FilterProps} />
        {renderHotKeys()}
        {renderResult()}
      </section>
    </CSSTransition>
  );
};

export default React.memo(Search);
