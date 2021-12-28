/*
 * @Date: 2021-12-09 17:18:49
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-27 10:28:22
 * @Description:
 * @FilePath: \melodia-ts\src\application\Search\index.tsx
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import { CommonPlaylist, CommonSongList, HorizenScroll, Scroll } from '../../baseUI';
import { Icon } from '../../components';
import useDebounce from '../../hooks/useDebounce';
import { IApplicationState } from '../../store/reducers';
import { getResOrderLable, getCount, isEmptyObject } from '../../utils/tools';
import Filter from './component/filter';
import * as ActionType from './store/constants';
import classNames from 'classnames';
import Tabs from '../../components/Tabs';
import LazyLoad, { forceCheck } from 'react-lazyload';
import defaultImg from './../../assets/img/defaultmusic.png';
import MusicNote from '../../baseUI/musicNote';

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
  const musicNoteRef = useRef<any>();
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
    if (!musicNoteRef.current) return;
    musicNoteRef.current.startAnimation(event.nativeEvent.clientY);
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

  const renderSingers = () => {
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
          );
        })}
      </div>
    );
  };

  const renderContent = useCallback(
    (option: string) => {
      switch (option) {
        case '歌曲':
          return (
            <div className="scroll-w-wrapper">
              <Scroll ref={ScrollRef}>
                <CommonSongList
                  songs={songsList}
                  onClickCallback={handleSelectSong}
                  showNum={false}
                />
              </Scroll>
            </div>
          );
        case '歌手':
          return renderSingers();
        case '歌单':
          return (
            <CommonPlaylist
              data={suggestObject.playlists ? suggestObject.playlists : []}
              onClickCallback={enterDetail}
            />
          );
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
        <MusicNote ref={musicNoteRef} />
      </section>
    </CSSTransition>
  );
};

export default React.memo(Search);
