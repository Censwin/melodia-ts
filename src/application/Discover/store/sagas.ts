/*
 * @Author: Censwin
 * @Date: 2021-11-14 17:37:43
 * @LastEditTime: 2021-11-16 17:04:46
 * @Description:
 * @FilePath: /melodia-ts/src/application/Discover/store/sagas.ts
 */
import { takeLatest, put, call } from '@redux-saga/core/effects';
import { getBannerList, getRecommendList } from '../../../services/discoverApi';
import { IBannerRes, IRecommendListRes } from './types';
import * as actionTypes from './constants';
export function* fetchBanner() {
  try {
    const { banners } = (yield call(getBannerList)) as IBannerRes;
    yield put({ type: actionTypes.SAVE_BANNER, payload: banners });
  } catch (error) {
    console.error('拦截到了:' + error);
  }
}

export function* fetchRecommendList(): Generator<any> {
  try {
    const { result } = (yield call(getRecommendList)) as IRecommendListRes;
    yield put({ type: actionTypes.SAVE_RECOMMEND, payload: result });
  } catch (error) {
    console.error('拦截到了:' + error);
  }
}

export default function* DiscoverWatcher() {
  yield takeLatest(actionTypes.GET_BANNER, fetchBanner);
  yield takeLatest(actionTypes.GET_RECOMMEND, fetchRecommendList);
}
