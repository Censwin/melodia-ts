/*
 * @Date: 2021-12-09 17:18:49
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-16 17:32:06
 * @Description:
 * @FilePath: \melodia-ts\src\application\Search\index.tsx
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import { CommonSongList, HorizenScroll } from '../../baseUI';
import { Icon } from '../../components';
import useDebounce from '../../hooks/useDebounce';
import { IApplicationState } from '../../store/reducers';
import { getResOrderLable, getCount } from '../../utils/tools';
import Filter from './component/filter';
import * as ActionType from './store/constants';
import classNames from 'classnames';
import Tabs from '../../components/Tabs';
import LazyLoad, { forceCheck } from 'react-lazyload';
import defaultImg from './../../assets/img/defaultmusic.png';

const Search = () => {
  const [showState, setShowState] = useState(true);
  const nodeRef = useRef(null);
  const history = useHistory();
  const [showHotkey, setShowHotkey] = useState(false);
  const [HotKey, setHotKey] = useState('');
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('');
  const { hotKeyList, suggestObject, songsList, enterLoading } = useSelector(
    (state: IApplicationState) => state.Search
  );

  useEffect(() => {
    dispatch({ type: ActionType.GET_HOT_KEYWRODS });
  }, []);

  const handleCancel = useCallback(() => {
    setShowState(false);
  }, []);

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

  const RenderHotKeys = useCallback(() => {
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

  const handleChangePannel = (key: string) => {
    setSelectedOption(key);
  };

  const RenderPlayList = () => {
    if (!suggestObject.playlists) return;
    return suggestObject.playlists.map((item) => {
      return (
        <div
          key={item.id}
          className="playlist-item"
          onClick={(_) => history.push(`/album/${item.id}`)}
        >
          <div className="item-pic-wrapper">
            <LazyLoad placeholder={<img width="100%" height="100%" src={defaultImg} />}>
              <img className="playlist-item-pic" src={item.coverImgUrl + '?param=300x300'} />
            </LazyLoad>
          </div>
          <div className="play-count">
            <Icon icon="play" />
            {getCount(item.playCount)}
          </div>
          <span className="recommend-item-name">{item.name}</span>
        </div>
      );
    });
  };

  const RenderContent = useCallback(
    (option: string) => {
      switch (option) {
        case 'songs':
          return <CommonSongList songs={songsList} onClickCallback={() => {}} showNum={false} />;
        case 'albums':
          return <h1>123</h1>;
        case 'playlists':
          return RenderPlayList();
        default:
          return <h1>123</h1>;
      }
    },
    [selectedOption]
  );

  return (
    <CSSTransition
      in={showState}
      appear={true}
      classNames="common-fadeInUp"
      timeout={300}
      unmountOnExit
      onExited={history.goBack}
      nodeRef={nodeRef}
    >
      <section className="search-container" ref={nodeRef}>
        <Filter {...FilterProps} />
        {RenderHotKeys()}
        <article className="result-wrapper">
          <Tabs onTabClick={handleChangePannel}>
            {suggestObject.order.map((item) => {
              return (
                <Tabs.Item label={item} key={item}>
                  {RenderContent(item)}
                </Tabs.Item>
              );
            })}
          </Tabs>
        </article>
      </section>
    </CSSTransition>
  );
};

export default React.memo(Search);
