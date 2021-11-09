/*
 * @Author: Censwin
 * @Date: 2021-10-30 17:34:29
 * @LastEditTime: 2021-10-31 14:29:48
 * @Description:
 * @FilePath: /melodia-ts/src/application/Home/store/index.ts
 */
import { all } from '@redux-saga/core/effects';
import homeSaga from './sagas';

export default function* rootSaga() {
    yield all([homeSaga()]);
}
