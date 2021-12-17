/*
 * @Author: Censwin
 * @Date: 2021-10-30 17:12:13
 * @LastEditTime: 2021-12-13 11:19:16
 * @Description:
 * @FilePath: \melodia-ts\src\store\reducers.ts
 */

import { combineReducers } from 'redux';
import HomeReducer, { IHomeState } from './../application/Home/store/reducer';
import { reducer as DiscoverReducer, IDiscoverState } from './../application/Discover/store';
import { reducer as RecommendReducer, IRcomendState } from './../application/Recommend/store';
import { reducer as AlbumReducer, IAlbumState } from './../application/Album/store';
import { reducer as RankReducer, IRankState } from './../application/Rank/store';
import { reducer as PlayerReducer, IPlayerState } from './../application/Player/store';
import { reducer as SearchReducer, ISearchState } from './../application/Search/store';

export const RootReducers = combineReducers({
  Home: HomeReducer,
  Discover: DiscoverReducer,
  Recommend: RecommendReducer,
  Album: AlbumReducer,
  Rank: RankReducer,
  Player: PlayerReducer,
  Search: SearchReducer
});

export interface IApplicationState {
  Home: IHomeState;
  Discover: IDiscoverState;
  Recommend: IRcomendState;
  Album: IAlbumState;
  Rank: IRankState;
  Player: IPlayerState;
  Search: ISearchState;
}
