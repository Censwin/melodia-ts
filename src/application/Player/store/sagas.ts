/*
 * @Date: 2021-11-29 10:25:08
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-07 17:08:14
 * @Description:
 * @FilePath: \melodia-ts\src\application\Player\store\sagas.ts
 */
import { takeLatest, call, put, select } from '@redux-saga/core/effects';
import { IApplicationState } from '../../../store/reducers';
import * as ActionType from './constans';
import { Action } from 'redux';
import { ICOMMONACTION } from '../../../utils/common_interface';
import { IPlayerState, EPlayMode } from './reducer';
import { findCurrentIndex, shuffle } from '../../../utils/tools';

function* changePlaymode(action: ICOMMONACTION) {
  const { type, payload: mode } = action;
  const Player: IPlayerState = yield select((state) => state.Player);
  const { sequencePlayList, currentSong, currentIndex } = Player;
  try {
    switch (mode) {
      case EPlayMode.sequence: {
        yield put({ type: ActionType.SET_PLAYLIST, payload: sequencePlayList });
        const index = findCurrentIndex(currentSong, sequencePlayList);
        yield put({ type: ActionType.SET_CURRENT_INDEX, payload: index });
        yield put({ type: ActionType.SET_PLAYMODE_TEXT, payload: '顺序播放' });
        break;
      }
      case EPlayMode.loop: {
        const newList = sequencePlayList.filter((_, index) => index === currentIndex);
        yield put({ type: ActionType.SET_PLAYLIST, payload: newList });
        yield put({ type: ActionType.SET_CURRENT_INDEX, payload: 0 });
        yield put({ type: ActionType.SET_PLAYMODE_TEXT, payload: '单曲循环' });
        break;
      }
      case EPlayMode.random: {
        const newList = shuffle(sequencePlayList);
        const index = findCurrentIndex(currentSong, newList);
        yield put({ type: ActionType.SET_PLAYLIST, payload: newList });
        yield put({ type: ActionType.SET_CURRENT_INDEX, payload: index });
        yield put({ type: ActionType.SET_PLAYMODE_TEXT, payload: '随机播放' });
        break;
      }
      default:
        yield put({ type: ActionType.SET_PLAYMODE_TEXT, payload: '切换失败' });
        console.error('切换失败');
        break;
    }
    yield put({ type: ActionType.SET_PLAY_MODE, payload: mode });
  } catch (error) {
    console.log(error);
  }
}

function* addSongToList(action: ICOMMONACTION) {
  const { payload } = action;
  const Player: IPlayerState = yield select((state) => state.Player);
  const { sequencePlayList, playList } = Player;
  let newSequenceList;
  let newPlayList;
  let currentSong;
  if (payload instanceof Array) {
    newSequenceList = [...sequencePlayList, ...payload];
    newPlayList = [...payload, ...playList];
    currentSong = payload[0];
  } else {
    newSequenceList = [...sequencePlayList, payload];
    newPlayList = [payload, ...playList];
    currentSong = payload;
  }
  yield put({ type: ActionType.SET_SEQUECE_PLAYLIST, payload: newSequenceList });
  yield put({ type: ActionType.SET_PLAYLIST, payload: newPlayList });
  yield put({ type: ActionType.SET_CURRENT_INDEX, payload: 0 });
  yield put({ type: ActionType.SET_CURRENT_SONG, payload: currentSong });
}

export default function* () {
  yield takeLatest(ActionType.CHANGE_PLAYMODE, changePlaymode);
  yield takeLatest(ActionType.ADD_CURRENT_SONG, addSongToList);
}
