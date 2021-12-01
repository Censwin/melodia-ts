/*
 * @Date: 2021-11-29 09:58:03
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-01 17:09:18
 * @Description:
 * @FilePath: \melodia-ts\src\application\Player\store\reducer.ts
 */
import { Reducer } from 'redux';
import produce, { Draft } from 'immer';
import * as ActionType from './constans';
import { temp } from './temp';
enum PlayMode {
  sequence,
  loop,
  random
}

export interface IPlayerState {
  isFullScreen: boolean;
  playing: boolean;
  sequencePlayList: any[];
  playList: any[];
  mode: PlayMode;
  currentIndex: number;
  showPlayList: boolean;
  currentSong: any;
}

const defaultState: IPlayerState = {
  isFullScreen: false,
  playing: false,
  sequencePlayList: [],
  playList: temp,
  mode: 0,
  currentIndex: -1,
  showPlayList: false,
  currentSong: {}
};

const PlayerReducer: Reducer<IPlayerState> = (state = defaultState, action) => {
  return produce(state, (draft: Draft<IPlayerState>) => {
    const { type, payload } = action;
    switch (type) {
      case ActionType.SET_ISFULL_SCREEN:
        draft.isFullScreen = payload;
        break;
      case ActionType.SET_CURRENT_SONG:
        draft.currentSong = payload;
        break;
      case ActionType.SET_CURRENT_INDEX:
        draft.currentIndex = payload;
        break;
      case ActionType.SET_PLAYING_STATE:
        draft.playing = payload;
        break;

      default:
        break;
    }
  });
};

export default PlayerReducer;
