/*
 * @Author: Censwin
 * @Date: 2021-11-14 17:37:30
 * @LastEditTime: 2021-11-16 16:41:01
 * @Description:
 * @FilePath: /melodia-ts/src/application/Discover/store/reducer.ts
 */
import { Reducer } from 'redux';
import produce, { Draft } from 'immer';
import { IDiscoverState } from './types';
import * as actionTypes from './constants';
const deafultState: IDiscoverState = {
  bannerList: [],
  recommendList: []
};
const DiscoverReducer: Reducer<IDiscoverState> = (state = deafultState, action) => {
  return produce(state, (draft: Draft<IDiscoverState>) => {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.SAVE_BANNER:
        draft.bannerList = payload;
        break;
      case actionTypes.SAVE_RECOMMEND:
        draft.recommendList = payload;
        break;
      default:
        break;
    }
  });
};

export default DiscoverReducer;
