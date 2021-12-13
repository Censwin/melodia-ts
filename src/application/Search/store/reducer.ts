/*
 * @Date: 2021-12-13 11:09:43
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-13 18:23:13
 * @Description:
 * @FilePath: \melodia-ts\src\application\Search\store\reducer.ts
 */
import produce, { Draft } from 'immer';
import { Reducer } from 'redux';
import { getResOrderLable } from '../../../utils/tools';
import * as ActionType from './constants';
import { temp1 } from './temp';
interface ISuggest {
  albums?: { id: number; name: string }[];
  artists?: { id: number; name: string; picUrl: string }[];
  order: string[]; // 该返回结果所显示的标签 如：  ["songs", "artists", "albums", "playlists"]
  playlists?: { id: number; name: string; playCount: number }[];
}

export interface ISearchState {
  hotKeyList: any[];
  suggestObject: ISuggest;
  songsList: any[];
  enterLoading: boolean;
}

const defaultState = {
  hotKeyList: [],
  suggestObject: temp1, // 列表歌单和歌手
  songsList: [], // 歌曲列表
  enterLoading: false
};

const SearchReducer: Reducer<ISearchState> = (state = defaultState, action) => {
  return produce(state, (draft: Draft<ISearchState>) => {
    const { type, payload } = action;
    switch (type) {
      case ActionType.SET_ENTER_LOADING:
        draft.enterLoading = payload;
        break;
      case ActionType.SET_HOT_KEYWRODS:
        draft.hotKeyList = payload;
        break;
      case ActionType.SET_RESULT_SONGS_LIST:
        draft.songsList = payload;
        break;
      case ActionType.SET_SUGGEST_LIST:
        draft.suggestObject = payload;
        draft.suggestObject.order = getResOrderLable(draft.suggestObject.order);
        break;
      default:
        break;
    }
  });
};

export default SearchReducer;
