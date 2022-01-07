/*
 * @Date: 2021-11-25 11:31:57
 * @LastEditors: k200c
 * @LastEditTime: 2022-01-07 14:12:32
 * @Description:
 * @FilePath: \melodia-ts\src\application\Rank\store\sagas.ts
 */
import { takeLatest, call, put } from '@redux-saga/core/effects';
import * as ActionType from './constans';
import { Action } from 'redux';
import { getRankList } from '../../../services/rankApi';

function* fetchRankList() {
  yield put({ type: 'global/CHANGE_GLOBAL_LOADING', payload: true });
  try {
    const { list } = yield call(getRankList);
    yield put({ type: ActionType.SAVE_RANKLIST, payload: list });
    yield put({ type: 'global/CHANGE_GLOBAL_LOADING', payload: false });
  } catch (error) {
    console.error(error);
    yield put({ type: 'global/CHANGE_GLOBAL_LOADING', payload: false });
  }
}

export default function* () {
  yield takeLatest(ActionType.GET_RANKLIST, fetchRankList);
}
