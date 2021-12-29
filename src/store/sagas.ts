/*
 * @Author: Censwin
 * @Date: 2021-10-30 17:32:01
 * @LastEditTime: 2021-12-29 14:59:54
 * @Description:
 * @FilePath: \melodia-ts\src\store\sagas.ts
 */
import { all } from 'redux-saga/effects';
import HomeSagas from '../application/Home/store';
import { sagas as DiscoverSagas } from '../application/Discover/store';
import { sagas as RecommendSagas } from '../application/Recommend/store';
import { sagas as AlbumSagas } from '../application/Album/store';
import { sagas as RankSagas } from '../application/Rank/store';
import { sagas as PlayerSagas } from '../application/Player/store';
import { sagas as SearchSagas } from '../application/Search/store';
import { sagas as SingerSagas } from '../application/Singer/store';

export default function* rootSagas() {
  yield all([
    HomeSagas(),
    DiscoverSagas(),
    RecommendSagas(),
    AlbumSagas(),
    RankSagas(),
    PlayerSagas(),
    SearchSagas(),
    SingerSagas()
  ]);
}
