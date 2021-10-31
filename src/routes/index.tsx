/*
 * @Author: Censwin
 * @Date: 2021-10-28 23:23:22
 * @LastEditTime: 2021-10-28 23:46:51
 * @Description:
 * @FilePath: /melodia-ts/src/routes/index.tsx
 */
import React, { Component, ReactNode } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Discover from '../application/Discover';
import Home from '../application/Home';

const routes = [
    {
        path: '/',
        component: Home,
        routes: [
            {
                path: '/',
                exact: true,
                render: () => <Redirect to="/discover" />
            },
            {
                path: '/discover',
                exact: true,
                component: Discover
            }
        ]
    }
];

export default routes;