/*
 * @Author: Censwin
 * @Date: 2021-10-30 17:12:13
 * @LastEditTime: 2021-11-24 10:40:54
 * @Description:
 * @FilePath: \melodia-ts\src\store\reducers.ts
 */

import { combineReducers } from 'redux';
import HomeReducer, { IHomeState } from './../application/Home/store/reducer';
import { reducer as DiscoverReducer, IDiscoverState } from './../application/Discover/store';
import { reducer as RecommendReducer, IRcomendState } from './../application/Recommend/store';
import { reducer as AlbumReducer, IAlbumState } from './../application/Album/store';
export const RootReducers = combineReducers({
  Home: HomeReducer,
  Discover: DiscoverReducer,
  Recommend: RecommendReducer,
  Album: AlbumReducer
});

export interface IApplicationState {
  Home: IHomeState;
  Discover: IDiscoverState;
  Recommend: IRcomendState;
  Album: IAlbumState;
}
