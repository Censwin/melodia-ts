/*
 * @Author: Censwin
 * @Date: 2021-10-30 17:34:21
 * @LastEditTime: 2021-11-14 17:36:25
 * @Description:
 * @FilePath: /melodia-ts/src/application/Home/store/sagas.ts
 */

import { takeEvery } from 'redux-saga/effects';

export function* fetchList() {
  yield console.log('success');
}

export default function* watchGetList() {
  yield takeEvery('TEST', fetchList);
}
