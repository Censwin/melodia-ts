/*
 * @Date: 2021-11-18 14:07:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-19 11:15:35
 * @Description:
 * @FilePath: \melodia-ts\src\application\Recommend\store\reducer.ts
 */
import { Reducer } from 'redux';
import produce, { Draft } from 'immer';
import * as ActionTypes from './constants';
import { DRAFTABLE } from 'immer/dist/internal';

export interface IRcomendState {
  cateList: any[];
  playLists: any[]; // 歌单列表
}
const defaultState: IRcomendState = {
  cateList: [],
  playLists: []
};

const RecommendReducer: Reducer<IRcomendState> = (state = defaultState, action) => {
  return produce(state, (draft: Draft<IRcomendState>) => {
    const { type, payload } = action;
    switch (type) {
      case ActionTypes.SAVE_CATELIST:
        draft.cateList = payload;
        break;
      case ActionTypes.SAVE_PLAYLISTS:
        draft.playLists = payload;
        break;
      default:
        break;
    }
  });
};

export default RecommendReducer;
