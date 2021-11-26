/*
 * @Author: Censwin
 * @Date: 2021-10-28 23:23:22
 * @LastEditTime: 2021-11-26 23:00:41
 * @Description:
 * @FilePath: /melodia-ts/src/routes/index.tsx
 */
import React, { Component, ReactNode } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Discover from '../application/Discover';
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Album from '../application/Album';
import Rank from '../application/Rank';

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
      },
      {
        path: '/recommend',
        exact: true,
        component: Recommend
      },
      {
        path: '/rank',
        exact: true,
        component: Rank
      },
      {
        path: '/album/:id',
        exact: true,
        key: 'album',
        component: Album
      }
    ]
  }
];

export default routes;
