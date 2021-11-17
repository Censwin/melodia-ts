/*
 * @Author: Censwin
 * @Date: 2021-11-14 17:37:14
 * @LastEditTime: 2021-11-16 16:15:24
 * @Description:
 * @FilePath: /melodia-ts/src/application/Discover/store/index.ts
 */
import { all } from '@redux-saga/core/effects';
import DiscoverSagas from './sagas';
import reducer from './reducer';
import * as constants from './constants';
export * from './types';

export { reducer, constants, DiscoverSagas };
// export default function* rootSaga() {
//   yield all([DiscoverWatcher()]);
// }
