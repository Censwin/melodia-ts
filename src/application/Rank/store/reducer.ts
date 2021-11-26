/*
 * @Date: 2021-11-24 18:05:04
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-25 17:08:50
 * @Description:
 * @FilePath: \melodia-ts\src\application\Rank\store\reducer.ts
 */
import { Reducer } from 'redux';
import produce, { Draft } from 'immer';
import * as ActionType from './constans';
export interface IRankState {
  rankList: any[];
}

const defaultState: IRankState = {
  rankList: []
};

const RankReducer: Reducer<IRankState> = (state = defaultState, action) => {
  return produce(state, (draft: Draft<IRankState>) => {
    const { type, payload } = action;
    switch (type) {
      case ActionType.SAVE_RANKLIST:
        draft.rankList = payload;
        break;

      default:
        break;
    }
  });
};

export default RankReducer;
