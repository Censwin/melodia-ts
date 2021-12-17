/*
 * @Author: Censwin
 * @Date: 2021-11-14 17:37:14
 * @LastEditTime: 2021-12-13 11:20:05
 * @Description:
 * @FilePath: \melodia-ts\src\application\Discover\store\index.ts
 */
// import { all } from '@redux-saga/core/effects';
import sagas from './sagas';
import reducer from './reducer';
import * as ActionTypes from './constants';
export * from './reducer';

export { reducer, ActionTypes, sagas };
// export default function* rootSaga() {
//   yield all([DiscoverWatcher()]);
// }
