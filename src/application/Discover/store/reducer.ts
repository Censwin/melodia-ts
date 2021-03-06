/*
 * @Author: Censwin
 * @Date: 2021-11-14 17:37:30
 * @LastEditTime: 2021-12-09 16:51:00
 * @Description:
 * @FilePath: \melodia-ts\src\application\Discover\store\reducer.ts
 */
import { Reducer } from 'redux';
import produce, { Draft } from 'immer';
import * as ActionTypes from './constants';

interface bannerItem {
  imageUrl: string;
}
export interface IDiscoverState {
  bannerList: bannerItem[];
  recommendList: any[];
  videoUrl: string;
}

const defaultState: IDiscoverState = {
  bannerList: [],
  recommendList: [],
  videoUrl: ''
};

const DiscoverReducer: Reducer<IDiscoverState> = (state = defaultState, action) => {
  return produce(state, (draft: Draft<IDiscoverState>) => {
    const { type, payload } = action;
    switch (type) {
      case ActionTypes.SAVE_BANNER:
        draft.bannerList = payload;
        break;
      case ActionTypes.SAVE_RECOMMEND:
        draft.recommendList = payload;
        break;
      case ActionTypes.SAVE_VIDEO_URL:
        draft.videoUrl = payload;
        break;
      default:
        break;
    }
  });
};

export default DiscoverReducer;
