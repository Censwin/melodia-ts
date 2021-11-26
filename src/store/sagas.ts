/*
 * @Author: Censwin
 * @Date: 2021-10-30 17:32:01
 * @LastEditTime: 2021-11-25 17:42:02
 * @Description:
 * @FilePath: \melodia-ts\src\store\sagas.ts
 */
import { all } from 'redux-saga/effects';
import HomeSagas from '../application/Home/store';
import { DiscoverSagas } from '../application/Discover/store';
import { RecommendSagas } from '../application/Recommend/store';
import { AlbumSagas } from '../application/Album/store';
import { RankSagas } from '../application/Rank/store';
export default function* rootSagas() {
  yield all([HomeSagas(), DiscoverSagas(), RecommendSagas(), AlbumSagas(), RankSagas()]);
}
