/*
 * @Author: Censwin
 * @Date: 2021-10-28 23:23:22
 * @LastEditTime: 2021-10-29 00:11:55
 * @Description:
 * @FilePath: /melodia-ts/src/application/Home/index.tsx
 */
import React, { ReactNode } from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { RouteProps } from 'react-router-dom';

interface IHomeProps extends RouteConfig {
    id?: string;
}
const Home: React.FC<IHomeProps> = (props) => {
    const { route } = props;
    return (
        <div className="home-container">
            <div className="home-header">header</div>
            {renderRoutes(route.routes)}
            <div className="home-footer">footer</div>
        </div>
    );
};

export default React.memo(Home);
