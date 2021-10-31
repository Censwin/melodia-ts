/*
 * @Author: Censwin
 * @Date: 2021-10-30 17:51:21
 * @LastEditTime: 2021-10-31 14:44:39
 * @Description:
 * @FilePath: /melodia-ts/src/application/Home/store/reducer.ts
 */
import produce, { Draft } from 'immer';
interface State {
    text: string;
}
const defaultState: State = {
    text: ''
};

export default (state = defaultState, action: { type: string }) => {
    return produce(state, (draft: Draft<State>) => {
        switch (action.type) {
            case 'TEST':
                draft.text = '8888888';
                break;
            default:
                break;
        }
    });
};
