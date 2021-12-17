/*
 * @Date: 2021-12-13 11:08:33
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-17 15:17:37
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
import * as ActionType from './constants';

function* getHotKeys() {
  try {
    const { result } = (yield call(getHotKeysRequest)) as IHotkeysRes;
    const { hots } = result;
    yield put({ type: ActionType.SET_HOT_KEYWRODS, payload: hots });
  } catch (error) {}
}

function* search(action: ICOMMONACTION) {
  try {
    const { payload } = action;
    const [suggests, songs]: [ISuggestRes, ISearchRes] = yield all([
      call(getSuggestListRequest, payload),
      call(getSearchResultRequest, payload)
    ]);
    yield put({ type: ActionType.SET_SUGGEST_LIST, payload: suggests.result });
    yield put({ type: ActionType.SET_RESULT_SONGS_LIST, payload: songs.result.songs });
  } catch (error) {}
}

export default function* () {
  yield takeLatest(ActionType.GET_HOT_KEYWRODS, getHotKeys);
  yield takeLatest(ActionType.SEARCH_KEYWORD, search);
}
