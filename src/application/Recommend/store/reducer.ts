/*
 * @Date: 2021-11-18 14:07:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-18 15:13:33
 * @Description:
 * @FilePath: \melodia-ts\src\application\Recommend\store\reducer.ts
 */
import { Reducer } from 'redux';
import produce, { Draft } from 'immer';
import * as ActionTypes from './constants';

export interface IRcomendState {
  cateList: any[];
}
const deafultState: IRcomendState = {
  cateList: []
};

const RecommendReducer: Reducer<IRcomendState> = (state = deafultState, action) => {
  return produce(state, (draft: Draft<IRcomendState>) => {
    const { type, payload } = action;
    switch (type) {
      case ActionTypes.SAVE_CATELIST:
        draft.cateList = payload;
        break;
      default:
        break;
    }
  });
};

export default RecommendReducer;
