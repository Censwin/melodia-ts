/*
 * @Author: Censwin
 * @Date: 2021-10-28 23:23:22
 * @LastEditTime: 2021-11-19 18:13:54
 * @Description:
 * @FilePath: \melodia-ts\src\routes\index.tsx
 */
import React, { Component, ReactNode } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Discover from '../application/Discover';
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Album from '../application/Album';

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
        component: Discover,
        routes: [
          {
            path: '/discover/recommend',
            component: Recommend,
            routes: [{ path: '/discover/recommend/:id', component: Album }]
          }
        ]
      }
    ]
  }
];

export default routes;
