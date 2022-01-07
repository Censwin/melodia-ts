/*
 * @Author: Censwin
 * @Date: 2021-10-30 17:51:21
 * @LastEditTime: 2022-01-07 14:00:52
 * @Description:
 * @FilePath: \melodia-ts\src\application\Home\store\reducer.ts
 */
import { Reducer } from 'redux';
import produce, { Draft } from 'immer';
import * as ActionType from './constans';
export interface IHomeState {
  Global_Loading: Boolean;
}
const defaultState: IHomeState = {
  Global_Loading: false
};

const HomeReducer: Reducer = (state = defaultState, action) => {
  return produce(state, (draft: Draft<IHomeState>) => {
    const { type, payload } = action;
    switch (type) {
      case ActionType.CHANGE_GLOBAL_LOADING:
        draft.Global_Loading = payload;
        break;
      default:
        break;
    }
  });
};

export default HomeReducer;
