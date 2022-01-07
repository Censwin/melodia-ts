/*
 * @Date: 2021-12-13 11:08:33
 * @LastEditors: k200c
 * @LastEditTime: 2022-01-07 14:32:18
 * @Description:
 * @FilePath: \melodia-ts\src\application\Search\store\sagas.ts
 */
import { call, put, takeLatest, SagaReturnType, all } from '@redux-saga/core/effects';
import {
  getHotKeysRequest,
  getSearchResultRequest,
  getSuggestListRequest,
  IHotkeysRes,
  ISearchRes,
  ISuggestRes
} from '../../../services/searchApi';
import { ICOMMONACTION } from '../../../utils/common_interface';
import { isEmptyObject } from '../../../utils/tools';
import * as ActionType from './constants';

function* getHotKeys() {
  yield put({ type: 'global/CHANGE_GLOBAL_LOADING', payload: true });
  try {
    const { result } = (yield call(getHotKeysRequest)) as IHotkeysRes;
    const { hots } = result;
    yield put({ type: ActionType.SET_HOT_KEYWRODS, payload: hots });
    yield put({ type: 'global/CHANGE_GLOBAL_LOADING', payload: false });
  } catch (error) {
    yield put({ type: 'global/CHANGE_GLOBAL_LOADING', payload: false });
  }
}

function* search(action: ICOMMONACTION) {
  yield put({ type: 'global/CHANGE_GLOBAL_LOADING', payload: true });
  try {
    const { payload } = action;
    const [suggests, songs]: [ISuggestRes, ISearchRes] = yield all([
      call(getSuggestListRequest, payload),
      call(getSearchResultRequest, payload)
    ]);
    // 有些歌手suggests会返回空对象导致没有标签，原因不明,写死一个以免一片空白
    let suggestsObj = suggests.result;
    if (isEmptyObject(suggests.result)) {
      suggestsObj = {
        order: ['songs']
      };
    }
    yield put({ type: ActionType.SET_SUGGEST_LIST, payload: suggestsObj });
    yield put({ type: ActionType.SET_RESULT_SONGS_LIST, payload: songs.result.songs });
    yield put({ type: 'global/CHANGE_GLOBAL_LOADING', payload: false });
  } catch (error) {
    yield put({ type: 'global/CHANGE_GLOBAL_LOADING', payload: false });
  }
}

export default function* () {
  yield takeLatest(ActionType.GET_HOT_KEYWRODS, getHotKeys);
  yield takeLatest(ActionType.SEARCH_KEYWORD, search);
}
