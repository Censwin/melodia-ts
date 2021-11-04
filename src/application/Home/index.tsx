/*
 * @Author: Censwin
 * @Date: 2021-10-28 23:23:22
 * @LastEditTime: 2021-11-04 15:02:55
 * @Description:
 * @FilePath: /melodia-ts/src/application/Home/index.tsx
 */
import React, { ReactNode } from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { NavLink } from 'react-router-dom';
import Icon from '../../components/Icon/icon';
import { useDispatch } from 'react-redux';

interface IHomeProps extends RouteConfig {
    id?: string;
}
const Home: React.FC<IHomeProps> = (props) => {
    const { route } = props;
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch({ type: 'TEST' });
    };
    return (
        <div className="home-container">
            {renderRoutes(route.routes)}
            <div className="home-footer">
                <NavLink to="/discover" activeClassName="RouterActive">
                    <div className="tab-item">
                        <Icon icon="toilet-paper-slash" />
                        <span>发现</span>
                    </div>
                </NavLink>
                <div className="CD-wrapper play">
                    <div className="CD">
                        <Icon icon="compact-disc" size="4x" />
                    </div>
                </div>
                <NavLink to="/mine" activeClassName="RouterActive">
                    <div className="tab-item">
                        <Icon icon="user-astronaut" />
                        <span>我的</span>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default React.memo(Home);
