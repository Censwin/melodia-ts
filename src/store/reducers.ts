/*
 * @Author: Censwin
 * @Date: 2021-10-30 17:12:13
 * @LastEditTime: 2021-11-18 15:05:42
 * @Description:
 * @FilePath: \melodia-ts\src\store\reducers.ts
 */

import { combineReducers } from 'redux';
import HomeReducer, { IHomeState } from './../application/Home/store/reducer';
import { reducer as DiscoverReducer, IDiscoverState } from './../application/Discover/store';
import { reducer as RecommendReducer, IRcomendState } from './../application/Recommend/store';

export const RootReducers = combineReducers({
  Home: HomeReducer,
  Discover: DiscoverReducer,
  Recommend: RecommendReducer
});

export interface IApplicationState {
  Home: IHomeState;
  Discover: IDiscoverState;
  Recommend: IRcomendState;
}
