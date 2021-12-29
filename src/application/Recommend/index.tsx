/*
 * @Date: 2021-11-17 14:57:53
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-17 17:29:17
 * @Description:
 * @FilePath: \melodia-ts\src\application\Recommend\index.tsx
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RouteConfig } from 'react-router-config';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router';
import { Header, Scroll } from '../../baseUI';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from './store';
import { IApplicationState } from '../../store/reducers';
import { forceCheck } from 'react-lazyload';
import Tabs from '../../components/Tabs';
import { CommonPlaylist } from './../../baseUI';

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
    const index = cateList.findIndex((item) => String(item.id) === id);
    dispatch({
      type: ActionTypes.GET_PLAYLISTS,
      payload: { cat: cateList[index].name, limit: 50 }
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
        <Tabs onTabClick={handleChangeSelectedId}>
          {cateList.map((item) => {
            return (
              <Tabs.Item label={item.name} key={item.id}>
                <div className="scroll-window-wrapper">
                  <Scroll ref={ScrollRef} onScroll={forceCheck}>
                    <div className="playlist-wrapper">
                      <CommonPlaylist data={playLists} onClickCallback={enterDetail} />
                    </div>
                  </Scroll>
                </div>
              </Tabs.Item>
            );
          })}
        </Tabs>
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = ({ Recommend }: IApplicationState) => ({
  cateList: Recommend.cateList
});

export default React.memo(Recommend);
