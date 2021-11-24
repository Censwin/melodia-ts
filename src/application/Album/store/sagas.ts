/*
 * @Date: 2021-11-19 17:36:37
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-24 11:44:04
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
  try {
    const { playlist } = (yield call(getAlbumDetail, payload)) as IAlbumDetailRes;
    yield put({ type: ActionTypes.SAVE_ALBUMDETAIL, payload: playlist });
  } catch (error) {
    console.error(error);
  }
}

export default function* () {
  yield takeLatest(ActionTypes.GET_ALBUMDETAIL, fetchAlbumDetail);
}
