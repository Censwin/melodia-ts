/*
 * @Author: Censwin
 * @Date: 2021-10-30 17:51:21
 * @LastEditTime: 2021-11-16 15:10:23
 * @Description:
 * @FilePath: /melodia-ts/src/application/Home/store/reducer.ts
 */
import produce, { Draft } from 'immer';
export interface IHomeState {
  text: string;
}
const defaultState: IHomeState = {
  text: ''
};

export default (state = defaultState, action: { type: string }) => {
  return produce(state, (draft: Draft<IHomeState>) => {
    switch (action.type) {
      case 'TEST':
        draft.text = '8888888';
        break;
      default:
        break;
    }
  });
};
