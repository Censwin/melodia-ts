/*
 * @Author: Censwin
 * @Date: 2021-11-14 17:37:14
 * @LastEditTime: 2021-11-18 14:58:15
 * @Description:
 * @FilePath: \melodia-ts\src\application\Discover\store\index.ts
 */
// import { all } from '@redux-saga/core/effects';
import DiscoverSagas from './sagas';
import reducer from './reducer';
import * as ActionTypes from './constants';
export * from './reducer';

export { reducer, ActionTypes, DiscoverSagas };
// export default function* rootSaga() {
//   yield all([DiscoverWatcher()]);
// }
