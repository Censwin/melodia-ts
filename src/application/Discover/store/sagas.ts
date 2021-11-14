/*
 * @Author: Censwin
 * @Date: 2021-11-14 17:37:43
 * @LastEditTime: 2021-11-15 00:04:50
 * @Description:
 * @FilePath: /melodia-ts/src/application/Discover/store/sagas.ts
 */
import { takeEvery, put } from '@redux-saga/core/effects';
import { getBannerList } from '../../../services/discover';

type bannerPromise = Promise<any>;
function* fetchBanner(): Generator<any> {
  const res = yield getBannerList();
  yield put({ type: 'saveBanner', payload: { banner: res } });
}

export default function* DiscoverWatcher() {
  yield takeEvery('getBanner', fetchBanner);
}
