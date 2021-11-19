/*
 * @Date: 2021-11-19 17:16:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-19 17:52:50
 * @Description:
 * @FilePath: \melodia-ts\src\application\Album\store\reudcer.ts
 */
import { Reducer } from 'redux';
import produce, { Draft } from 'immer';

export interface IAlbumState {
  playList: any[];
}
const defaultState: IAlbumState = {
  playList: []
};

const AlbumReducer: Reducer<IAlbumState> = (state = defaultState, action) => {
  return produce(state, (draft: Draft<IAlbumState>) => {
    const { type, payload } = action;
    switch (type) {
      case '':
        break;

      default:
        break;
    }
  });
};

export default AlbumReducer;
