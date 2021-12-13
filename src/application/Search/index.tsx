/*
 * @Date: 2021-12-09 17:18:49
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-13 18:22:01
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
import { getResOrderLable } from '../../utils/tools';
import Filter from './component/filter';
import * as ActionType from './store/constants';
import classNames from 'classnames';

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

  const RenderResOptions = useCallback(() => {
    const { order } = suggestObject;
    return order.map((item) => {
      const classes = classNames('r-cate-item horizen-item', {
        selected: selectedOption === item
      });
      return (
        <span key={item} className={classes} onClick={() => setSelectedOption(item)}>
          {item}
        </span>
      );
    });
  }, [suggestObject.order, selectedOption]);

  const RenderSuggest = () => {
    const { order } = suggestObject;
    return order.map((item: string) => {
      const show = item === selectedOption;
      console.log(show);
      return (
        <CSSTransition
          key={item}
          in={show}
          mountOnEnter
          unmountOnExit
          classNames="common-fadeInUp"
          timeout={300}
        >
          <div>
            <h1>{item}</h1>
          </div>
        </CSSTransition>
      );
    });
  };

  // const RenderSongs = useCallback(() => {
  //   return (
  //     <CSSTransition
  //       in={selectedOption === 'songs'}
  //       mountOnEnter
  //       unmountOnExit
  //       classNames="common-fadeInUp"
  //       timeout={300}
  //     >
  //       <CommonSongList songs={songsList} onClickCallback={() => {}} />
  //     </CSSTransition>
  //   );
  // }, [songsList]);

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
          <HorizenScroll>
            <div className="r-cate-wrapper">{RenderResOptions()}</div>
          </HorizenScroll>
          {/* {RenderSuggest()} */}
          {/* {RenderSongs()} */}
        </article>
      </section>
    </CSSTransition>
  );
};

export default React.memo(Search);
