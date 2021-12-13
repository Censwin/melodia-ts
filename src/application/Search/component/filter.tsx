/*
 * @Date: 2021-12-13 10:47:47
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-13 17:05:40
 * @Description:
 * @FilePath: \melodia-ts\src\application\Search\component\filter.tsx
 */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import useDebounce from '../../../hooks/useDebounce';
import { Icon } from '../../../components';

interface IFilterProps {
  handleCancel: () => void;
  handleSearch: (val: string) => void;
  setShowHotkey: Function;
  HotKey: string;
}
const Filter: React.FC<IFilterProps> = (props) => {
  const { HotKey } = props;
  const { handleCancel, handleSearch, setShowHotkey } = props;
  const inputRef = useRef<HTMLInputElement>(document.createElement('input'));
  const [inputVal, setInputVal] = useState('');
  const debounceVal = useDebounce(inputVal);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  // useEffect(() => {
  //   setShowHotkey(inputVal.length === 0);
  // }, [inputVal]);
  useEffect(() => {
    if (inputVal !== HotKey) {
      setInputVal(HotKey);
      inputRef.current.value = HotKey;
    }
  }, [HotKey]);
  const RenderButton = useCallback(() => {
    if (inputVal) {
      return (
        <button type="submit" className="search-button" onClick={() => handleSearch(inputVal)}>
          搜索
        </button>
      );
    }
    return (
      <button className="search-button" onClick={handleCancel}>
        取消
      </button>
    );
  }, [inputVal]);
  return (
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
  );
};

export default React.memo(Filter);
