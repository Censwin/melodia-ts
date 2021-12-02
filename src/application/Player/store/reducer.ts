/*
 * @Date: 2021-11-29 09:58:03
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-02 17:07:05
 * @Description:
 * @FilePath: \melodia-ts\src\application\Player\store\reducer.ts
 */
import { Reducer } from 'redux';
import produce, { Draft } from 'immer';
import * as ActionType from './constans';
import { temp } from './temp';

export enum EPlayMode {
  sequence,
  loop,
  random
}

type TPlayModeTexts = '顺序播放' | '单曲循环' | '随机播放' | '切换失败';
export interface IPlayerState {
  isFullScreen: boolean;
  playing: boolean;
  sequencePlayList: any[];
  playList: any[];
  playmode: EPlayMode;
  playmodeText: TPlayModeTexts;
  currentIndex: number;
  showPlayList: boolean;
  currentSong: any;
}

const defaultState: IPlayerState = {
  isFullScreen: false,
  playing: false,
  sequencePlayList: temp,
  playList: temp,
  playmode: 0,
  currentIndex: -1,
  showPlayList: false,
  currentSong: {},
  playmodeText: '顺序播放'
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
      case ActionType.SET_PLAYLIST:
        draft.playList = payload;
        break;
      case ActionType.SET_PLAYMODE_TEXT:
        draft.playmodeText = payload;
        break;
      case ActionType.SET_PLAY_MODE:
        draft.playmode = payload;
        break;
      case ActionType.SET_SHOW_PLAYLIST:
        draft.showPlayList = payload;
        break;
      default:
        break;
    }
  });
};

export default PlayerReducer;
