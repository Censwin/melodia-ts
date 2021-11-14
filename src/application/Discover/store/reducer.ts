/*
 * @Author: Censwin
 * @Date: 2021-11-14 17:37:30
 * @LastEditTime: 2021-11-14 23:33:06
 * @Description:
 * @FilePath: /melodia-ts/src/application/Discover/store/reducer.ts
 */
import produce, { Draft } from 'immer';
interface bannerItem {
  imageUrl: string;
}
interface IState {
  bannerList: bannerItem[];
}
const deafultState: IState = {
  bannerList: []
};
export default function (
  state = deafultState,
  action: { type: string; payload: { banner: any[] } }
) {
  return produce(state, (draft: Draft<IState>) => {
    const { type, payload } = action;
    switch (type) {
      case 'saveBanner':
        draft.bannerList = payload.banner;
        break;
      default:
        break;
    }
  });
}
