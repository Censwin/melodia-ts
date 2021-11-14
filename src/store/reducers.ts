/*
 * @Author: Censwin
 * @Date: 2021-10-30 17:12:13
 * @LastEditTime: 2021-11-14 22:07:48
 * @Description:
 * @FilePath: /melodia-ts/src/store/reducers.ts
 */

import { combineReducers } from 'redux';
import HomeReducer from './../application/Home/store/reducer';
import DiscoverReducer from './../application/Discover/store/reducer';
export const RootReducers = combineReducers({
  HomeReducer,
  DiscoverReducer
});
