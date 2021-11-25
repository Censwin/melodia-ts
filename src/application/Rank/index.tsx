/*
 * @Date: 2021-11-24 15:32:17
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-25 18:04:49
 * @Description: 排行榜
 * @FilePath: \melodia-ts\src\application\Rank\index.tsx
 */
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router';
import { Header } from '../../baseUI';
import * as ActionType from './store/constans';
import { IApplicationState } from '../../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
const Rank = () => {
  const [showStatus, setShowStatus] = useState(true);
  const history = useHistory();
  const nodeRef = useRef(null);
  const dispatch = useDispatch();
  const { rankList } = useSelector((state: IApplicationState) => state.Rank);
  console.log(rankList);
  useEffect(() => {
    dispatch({ type: ActionType.GET_RANKLIST });
  }, []);
  const findIndex = useCallback((_list) => {
    for (let i = 0; i < _list.length; i++) {
      if (_list[i].tracks.length && !_list[i + 1].tracks.length) {
        return i + 1;
      }
    }
  }, []);
  const [globalStartIndex, officialList, globalList] = useMemo(() => {
    let index = findIndex(rankList);
    let list1 = rankList.slice(0, index);
    let list2 = rankList.slice(index);
    return [index, list1, list2];
  }, rankList);
  console.log(officialList);
  console.log(globalList);
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
        <Header title="排行榜" handleClick={() => setShowStatus(false)} />
      </div>
    </CSSTransition>
  );
};

export default React.memo(Rank);
