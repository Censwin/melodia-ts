/*
 * @Date: 2021-11-19 17:36:37
 * @LastEditors:
 * @LastEditTime: 2021-11-19 17:46:19
 * @Description:
 * @FilePath: \melodia-ts\src\application\Album\store\sagas.ts
 */
import { takeLatest } from '@redux-saga/core/effects';
import * as ActionTypes from './constants';

function* fetchAlbumDetail() {}

export default function* () {
  yield takeLatest(ActionTypes.GET_ALBUMDETAIL, fetchAlbumDetail);
}
