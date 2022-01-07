/*
 * @Date: 2021-11-19 17:36:37
 * @LastEditors: k200c
 * @LastEditTime: 2022-01-07 14:25:11
 * @Description:
 * @FilePath: \melodia-ts\src\application\Album\store\sagas.ts
 */
import { takeLatest, call, put } from '@redux-saga/core/effects';
import * as ActionTypes from './constants';
import { IAlbumDetailRes, getAlbumDetail, IAlbumDetailParams } from '../../../services/albumApi';
import { Action } from 'redux';

interface AlbumDetailAction extends Action {
  payload: IAlbumDetailParams;
}
function* fetchAlbumDetail(action: AlbumDetailAction) {
  const { payload } = action;

  yield put({ type: 'global/CHANGE_GLOBAL_LOADING', payload: true });
  try {
    const { playlist } = (yield call(getAlbumDetail, payload)) as IAlbumDetailRes;
    yield put({ type: ActionTypes.SAVE_ALBUMDETAIL, payload: playlist });
    yield put({ type: 'global/CHANGE_GLOBAL_LOADING', payload: false });
  } catch (error) {
    console.error(error);

    yield put({ type: 'global/CHANGE_GLOBAL_LOADING', payload: false });
  }
}

export default function* () {
  yield takeLatest(ActionTypes.GET_ALBUMDETAIL, fetchAlbumDetail);
}
