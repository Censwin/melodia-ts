/*
 * @Date: 2021-12-29 14:34:41
 * @LastEditors: k200c
 * @LastEditTime: 2022-01-07 14:28:23
 * @Description:
 * @FilePath: \melodia-ts\src\application\Singer\store\sagas.ts
 */
import { call, put, takeLatest, all } from '@redux-saga/core/effects';
import { getSingerDataReq } from '../../../services/singerApi';
import type { ISingerDataRes } from '../../../services/singerApi';
import { ICOMMONACTION } from '../../../utils/common_interface';
import * as ActionType from './constants';

function* getSingerData(action: ICOMMONACTION) {
  try {
    yield put({ type: 'global/CHANGE_GLOBAL_LOADING', payload: true });
    const { payload } = action;
    const { artist, hotSongs } = (yield call(getSingerDataReq, payload)) as ISingerDataRes;
    yield put({ type: ActionType.CHANGE_SINGER, payload: artist });
    yield put({ type: ActionType.CHANGE_SONGS_OF_SINGER, payload: hotSongs });
    yield put({ type: 'global/CHANGE_GLOBAL_LOADING', payload: false });
  } catch (error) {}
}

export default function* () {
  yield takeLatest(ActionType.GET_SINGER, getSingerData);
}
