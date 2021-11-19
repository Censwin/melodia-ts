/*
 * @Date: 2021-11-18 14:20:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-19 15:10:32
 * @Description:
 * @FilePath: \melodia-ts\src\application\Recommend\store\saga.ts
 */
import { takeLatest, put, call } from '@redux-saga/core/effects';
import * as ActionTypes from './constants';
import {
  IHotCateRes,
  getHotCateList,
  getPlayLists,
  IPlayListRes,
  IPlayListParams
} from '../../../services/recommendAPI';
import { Action } from 'redux';

function* fetchHotCateList() {
  try {
    const { tags } = (yield call(getHotCateList)) as IHotCateRes;
    yield put({ type: ActionTypes.SAVE_CATELIST, payload: tags });
    const param = { cat: tags[0].name as string, limit: 50 };
    yield put({ type: ActionTypes.GET_PLAYLISTS, payload: param });
  } catch (error) {
    console.error(error);
  }
}

interface PlaylistAction extends Action {
  payload: IPlayListParams;
}
function* fetchPlayLists(action: PlaylistAction) {
  const { payload } = action;
  try {
    const { playlists } = (yield call(getPlayLists, payload)) as IPlayListRes;
    yield put({ type: ActionTypes.SAVE_PLAYLISTS, payload: playlists });
  } catch (error) {}
}

export default function* () {
  yield takeLatest(ActionTypes.GET_CATELIST, fetchHotCateList);
  yield takeLatest(ActionTypes.GET_PLAYLISTS, fetchPlayLists);
}
