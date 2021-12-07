/*
 * @Date: 2021-11-25 11:31:57
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-25 17:09:00
 * @Description:
 * @FilePath: \melodia-ts\src\application\Rank\store\sagas.ts
 */
import { takeLatest, call, put } from '@redux-saga/core/effects';
import * as ActionType from './constans';
import { Action } from 'redux';
import { getRankList } from '../../../services/rankApi';

function* fetchRankList() {
  try {
    const { list } = yield call(getRankList);
    yield put({ type: ActionType.SAVE_RANKLIST, payload: list });
  } catch (error) {
    console.error(error);
  }
}

export default function* () {
  yield takeLatest(ActionType.GET_RANKLIST, fetchRankList);
}
