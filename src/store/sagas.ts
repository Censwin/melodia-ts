/*
 * @Author: Censwin
 * @Date: 2021-10-30 17:32:01
 * @LastEditTime: 2021-11-14 21:51:48
 * @Description:
 * @FilePath: /melodia-ts/src/store/sagas.ts
 */
import { all } from 'redux-saga/effects';
import HomeSagas from '../application/Home/store';
import { DiscoverSagas } from '../application/Discover/store';
export default function* rootSagas() {
  yield all([HomeSagas(), DiscoverSagas()]);
}
