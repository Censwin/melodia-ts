/*
 * @Author: Censwin
 * @Date: 2021-11-14 17:37:14
 * @LastEditTime: 2021-11-14 21:34:04
 * @Description:
 * @FilePath: /melodia-ts/src/application/Discover/store/index.ts
 */
import { all } from '@redux-saga/core/effects';
import DiscoverWatcher from './sagas';

export default function* rootSaga() {
  yield all([DiscoverWatcher()]);
}
