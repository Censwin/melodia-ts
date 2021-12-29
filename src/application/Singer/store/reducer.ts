/*
 * @Date: 2021-12-29 14:40:13
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-29 15:08:37
 * @Description:
 * @FilePath: \melodia-ts\src\application\Singer\store\reducer.ts
 */
import produce, { Draft } from 'immer';
import { Reducer } from 'redux';
import * as ActionType from './constants';

export interface ISingerState {
  artist: any;
  songsOfArtist: any[];
}

const defaultState = {
  artist: {},
  songsOfArtist: []
};

const SingerReducer: Reducer<ISingerState> = (state = defaultState, action) => {
  return produce(state, (draft: Draft<ISingerState>) => {
    const { type, payload } = action;
    switch (type) {
      case ActionType.CHANGE_SINGER:
        draft.artist = payload;
        break;
      case ActionType.CHANGE_SONGS_OF_SINGER:
        draft.songsOfArtist = payload;
        break;
      default:
        break;
    }
  });
};

export default SingerReducer;
