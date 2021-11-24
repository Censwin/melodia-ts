/*
 * @Date: 2021-11-19 17:16:10
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-24 11:44:09
 * @Description:
 * @FilePath: \melodia-ts\src\application\Album\store\reducer.ts
 */
import { Reducer } from 'redux';
import produce, { Draft } from 'immer';
import * as ActionTypes from './constants';
export interface IAlbumState {
  playList: any[];
  currentAlbum: any;
}
const defaultState: IAlbumState = {
  playList: [],
  currentAlbum: {}
};

const AlbumReducer: Reducer<IAlbumState> = (state = defaultState, action) => {
  return produce(state, (draft: Draft<IAlbumState>) => {
    const { type, payload } = action;
    switch (type) {
      case ActionTypes.SAVE_ALBUMDETAIL:
        draft.currentAlbum = payload;
        break;

      default:
        break;
    }
  });
};

export default AlbumReducer;
