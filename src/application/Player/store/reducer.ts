/*
 * @Date: 2021-11-29 09:58:03
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-07 17:16:26
 * @Description:
 * @FilePath: \melodia-ts\src\application\Player\store\reducer.ts
 */
import { Reducer } from 'redux';
import produce, { Draft } from 'immer';
import * as ActionType from './constans';

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
  sequencePlayList: [],
  playList: [],
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
      case ActionType.SET_SEQUECE_PLAYLIST:
        draft.sequencePlayList = payload;
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
      case ActionType.DEL_CURRENT_SONG:
        draft.playList = draft.playList.filter((item) => item.id !== payload.id);
        draft.sequencePlayList = draft.sequencePlayList.filter((item) => item.id !== payload.id);
        break;
      default:
        break;
    }
  });
};

export default PlayerReducer;
