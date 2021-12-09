/*
 * @Date: 2021-11-17 14:57:53
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-24 14:49:19
 * @Description:
 * @FilePath: \melodia-ts\src\application\Recommend\index.tsx
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router';
import { Header, HorizenScroll, Scroll } from '../../baseUI';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from './store';
import { IApplicationState } from '../../store/reducers';
import { Icon } from '../../components';
import { getCount } from '../../utils/tools';
import LazyLoad, { forceCheck } from 'react-lazyload';
import defaultImg from './../../assets/img/defaultmusic.png';

interface IRecommendProps extends RouteConfig {
  a?: string;
}

const Recommend: React.FC<IRecommendProps> = (props) => {
  const { route } = props;
  const [show, setshow] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const { cateList, playLists } = useSelector((state: IApplicationState) => state.Recommend);
  const containerRef = useRef(null);
  type ScrollComponentType = React.ElementRef<typeof Scroll>;
  const ScrollRef = useRef<ScrollComponentType>(null);
  // useEffect(() => {
  //   setshow(true);
  // }, []);
  useEffect(() => {
    if (!cateList.length) {
      dispatch({ type: ActionTypes.GET_CATELIST });
    }
  }, []);
  useEffect(() => {
    if (cateList.length !== 0 && selectedId === '') {
      setSelectedId(cateList[0].id);
    }
    ScrollRef.current?.refresh();
  }, [cateList, playLists]);

  const handleBack = useCallback(() => {
    setshow(false);
  }, []);

  const enterDetail = useCallback((id) => {
    history.push(`/album/${id}`);
  }, []);

  const handleChangeSelectedId = (id: string) => {
    setSelectedId(id);
    const index = cateList.findIndex((item) => item.id === id);
    dispatch({
      type: ActionTypes.GET_PLAYLISTS,
      payload: { cat: cateList[index].name, limit: 50 }
    });
  };

  const RenderCateOptions = useCallback(() => {
    return cateList.map((item) => {
      const classes = classNames('r-cate-item horizen-item', {
        selected: selectedId === item.id
      });
      return (
        <span key={item.id} className={classes} onClick={() => handleChangeSelectedId(item.id)}>
          {item.name}
        </span>
      );
    });
  }, [selectedId]);

  const RenderPlayList = () => {
    return playLists.map((item) => {
      return (
        <div key={item.id} className="playlist-item" onClick={(_) => enterDetail(item.id)}>
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

  return (
    <CSSTransition
      nodeRef={containerRef} // TRG issue 668
      in={show}
      timeout={300}
      classNames="common-fadeInUp"
      unmountOnExit
      appear={true}
      onExited={history.goBack}
    >
      <div className="recommend-container" ref={containerRef}>
        <Header title="歌单广场" handleClick={handleBack} />
        <HorizenScroll>
          <div className="r-cate-wrapper">{RenderCateOptions()}</div>
        </HorizenScroll>
        <div className="scroll-window-wrapper">
          <Scroll ref={ScrollRef} onScroll={forceCheck}>
            <div className="playlist-wrapper">{RenderPlayList()}</div>
          </Scroll>
        </div>
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = ({ Recommend }: IApplicationState) => ({
  cateList: Recommend.cateList
});

export default React.memo(Recommend);
