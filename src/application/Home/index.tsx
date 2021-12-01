/*
 * @Author: Censwin
 * @Date: 2021-10-28 23:23:22
 * @LastEditTime: 2021-12-01 16:36:47
 * @Description:
 * @FilePath: \melodia-ts\src\application\Home\index.tsx
 */
import React, { ReactNode, useCallback } from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { NavLink } from 'react-router-dom';
import { Icon } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import Player from './../Player';
import { IApplicationState } from '../../store/reducers';
import classNames from 'classnames';
import { isEmptyObject } from '../../utils/tools';
interface IHomeProps extends RouteConfig {
  id?: string;
}
const Home: React.FC<IHomeProps> = (props) => {
  const { route } = props;
  const dispatch = useDispatch();
  const { currentSong, playing } = useSelector((state: IApplicationState) => state.Player);
  const handleClick = () => {
    dispatch({ type: 'TEST' });
  };
  const CD_PIC_CLASSES = classNames('cd-image', {
    play: playing,
    pause: !playing
  });
  const handleOpenPlayer = useCallback(() => {
    dispatch({ type: 'player/SET_ISFULL_SCREEN', payload: true });
  }, []);
  return (
    <div className="home-container">
      {renderRoutes(route.routes)}
      <Player />
      <div className="home-footer">
        <NavLink to="/discover" activeClassName="RouterActive">
          <div className="tab-item">
            <Icon icon="compass" />
            <span>发现</span>
          </div>
        </NavLink>
        <div className="CD-wrapper" onClick={handleOpenPlayer}>
          <div className="img-wrapper">
            {!isEmptyObject(currentSong) && (
              <img
                className={CD_PIC_CLASSES}
                src={currentSong.al.picUrl + '?param=400x400'}
                alt=""
              />
            )}
          </div>
        </div>
        <NavLink to="/mine" activeClassName="RouterActive">
          <div className="tab-item">
            <Icon icon="mitten" />
            <span>我的</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default React.memo(Home);
