/*
 * @Date: 2021-11-18 14:20:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-18 18:10:45
 * @Description:
 * @FilePath: \melodia-ts\src\application\Recommend\store\saga.ts
 */
import { takeLatest, put, call } from '@redux-saga/core/effects';
import * as ActionTypes from './constants';
import {
  IHotCateRes,
  getHotCateList,
  getPlayList,
  IPlayListRes,
  IPlayListParams
} from '../../../services/recommendAPI';
import { Action } from 'redux';
function* fetchHotCateList() {
  try {
    const { tags } = (yield call(getHotCateList)) as IHotCateRes;
    yield put({ type: ActionTypes.SAVE_CATELIST, payload: tags });
    const param = { cat: tags[0].name as string, limit: 50 };
    yield call(fetchPlayList, param);
  } catch (error) {
    console.error(error);
  }
}

interface PlaylistAction extends IPlayListParams, Action {}
function* fetchPlayList() {
  // try {
  //   const { playlists } = (yield call(getPlayList, { cat: '华语', limit: 50 })) as IPlayListRes;
  // } catch (error) {
  // }
}

export default function* () {
  yield takeLatest(ActionTypes.GET_CATELIST, fetchHotCateList);
  yield takeLatest(ActionTypes.GET_PLAYLIST, fetchPlayList);
}
