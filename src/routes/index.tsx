/*
 * @Author: Censwin
 * @Date: 2021-10-28 23:23:22
 * @LastEditTime: 2021-12-29 17:19:29
 * @Description:
 * @FilePath: \melodia-ts\src\routes\index.tsx
 */
import React, { Component, Suspense, lazy } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../application/Home';
// import Discover from '../application/Discover';
// import Recommend from '../application/Recommend';
// import Album from '../application/Album';
// import Rank from '../application/Rank';
// import Search from '../application/Search';
// import Singer from '../application/Singer';
// const Home = lazy(() => import('../application/Home'));
const Discover = lazy(() => import('../application/Discover'));
const Recommend = lazy(() => import('../application/Recommend'));
const Album = lazy(() => import('../application/Album'));
const Rank = lazy(() => import('../application/Rank'));
const Search = lazy(() => import('../application/Search'));
const Singer = lazy(() => import('../application/Singer'));

const SuspenseComponent = (Component: any) => (props: any) =>
  (
    <Suspense fallback="">
      <Component {...props} />
    </Suspense>
  );

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
        component: SuspenseComponent(Discover)
      },
      {
        path: '/recommend',
        exact: true,
        component: SuspenseComponent(Recommend)
      },
      {
        path: '/rank',
        exact: true,
        component: SuspenseComponent(Rank)
      },
      {
        path: '/album/:id',
        exact: true,
        key: 'album',
        component: SuspenseComponent(Album)
      },
      {
        path: '/search',
        exact: true,
        key: 'search',
        component: SuspenseComponent(Search)
      },
      {
        path: '/singers/:id',
        exact: true,
        component: SuspenseComponent(Singer)
      }
    ]
  }
];

export default routes;
