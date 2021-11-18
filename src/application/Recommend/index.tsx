/*
 * @Date: 2021-11-17 14:57:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-18 16:39:06
 * @Description:
 * @FilePath: \melodia-ts\src\application\Recommend\index.tsx
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router';
import { Header, HorizenList } from '../../baseUI';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from './store';
import { IApplicationState } from '../../store/reducers';

const Recommend: React.FC = (props) => {
  const [show, setshow] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const { cateList } = useSelector((state: IApplicationState) => state.Recommend);
  const containerRef = useRef(null);
  useEffect(() => {
    setshow(true);
  }, []);
  useEffect(() => {
    if (!cateList.length) {
      dispatch({ type: ActionTypes.GET_CATELIST });
      // dispatch({ type: ActionTypes.GET_PLAYLIST });
    }
  }, []);
  useEffect(() => {
    if (cateList.length !== 0 && selectedId === '') {
      setSelectedId(cateList[0].id);
    }
  }, [cateList]);
  const handleBack = useCallback(() => {
    setshow(false);
  }, []);
  const RenderCateOptions = useCallback(() => {
    return cateList.map((item) => {
      const classes = classNames('r-cate-item horizen-item', {
        selected: selectedId === item.id
      });
      return (
        <span key={item.id} className={classes} onClick={() => setSelectedId(item.id)}>
          {item.name}
        </span>
      );
    });
  }, [selectedId]);
  return (
    <CSSTransition
      nodeRef={containerRef} // TRG issue 668
      in={show}
      timeout={300}
      classNames="recommend-fade"
      unmountOnExit
      appear={true}
      onExited={history.goBack}
    >
      <div className="recommend-container" ref={containerRef}>
        <Header title="歌单广场" handleClick={handleBack} />
        <HorizenList>
          <div className="r-cate-wrapper">{RenderCateOptions()}</div>
        </HorizenList>
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = ({ Recommend }: IApplicationState) => ({
  cateList: Recommend.cateList
});

export default React.memo(Recommend);
