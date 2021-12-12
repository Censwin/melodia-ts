/*
 * @Date: 2021-12-09 17:18:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-12 00:00:30
 * @Description:
 * @FilePath: /melodia-ts/src/application/Search/index.tsx
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import { Icon } from '../../components';

const Search = () => {
  const [showState, setShowState] = useState(true);
  const nodeRef = useRef(null);
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(document.createElement('input'));
  const [inputVal, setInputVal] = useState('');
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };
  const RenderButton = useCallback(() => {
    if (inputVal) {
      return (
        <button type="submit" className="search-button">
          搜索
        </button>
      );
    }
    return (
      <button className="search-button" onClick={() => setShowState(false)}>
        取消
      </button>
    );
  }, [inputVal]);
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
        <article className="search-header">
          <form>
            <div className="input-wrapper">
              <Icon icon="search" />
              <input
                type="text"
                ref={inputRef}
                placeholder="搜索音乐、视频、博客、歌词"
                onChange={handleInput}
              />
            </div>
            {RenderButton()}
          </form>
        </article>
      </section>
    </CSSTransition>
  );
};

export default React.memo(Search);
