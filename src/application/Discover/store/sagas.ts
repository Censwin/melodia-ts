/*
 * @Author: Censwin
 * @Date: 2021-11-14 17:37:43
 * @LastEditTime: 2021-11-15 17:08:55
 * @Description:
 * @FilePath: /melodia-ts/src/application/Discover/store/sagas.ts
 */
import { takeEvery, put, call } from '@redux-saga/core/effects';
import { getBannerList, IBannersRes } from '../../../services/discover';

function* fetchBanner(): Generator<any> {
  const res = yield call(getBannerList);
  console.log(123123);
  console.log(res);
  // yield put({ type: 'saveBanner', payload: { banner: res.banners } });
}

export default function* DiscoverWatcher() {
  yield takeEvery('getBanner', fetchBanner);
}
