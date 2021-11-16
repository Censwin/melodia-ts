/*
 * @Author: Censwin
 * @Date: 2021-10-30 17:12:13
 * @LastEditTime: 2021-11-16 15:12:33
 * @Description:
 * @FilePath: /melodia-ts/src/store/reducers.ts
 */

import { combineReducers } from 'redux';
import HomeReducer, { IHomeState } from './../application/Home/store/reducer';
import { reducer as DiscoverReducer, IDiscoverState } from './../application/Discover/store';

export const RootReducers = combineReducers({
  Home: HomeReducer,
  Discover: DiscoverReducer
});

export interface IApplicationState {
  Home: IHomeState;
  Discover: IDiscoverState;
}
