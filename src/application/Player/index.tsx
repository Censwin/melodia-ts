/*
 * @Author: Censwin
 * @Date: 2021-11-28 11:35:22
 * @LastEditTime: 2021-11-29 17:32:54
 * @Description:
 * @FilePath: \melodia-ts\src\application\Player\index.tsx
 */
import { abort } from 'process';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../store/reducers';
import NormalPlayer from './component/normalPlayer';
import * as ActionType from './store/constans';
const Player = () => {
  const dispatch = useDispatch();
  const {
    isFullScreen,
    playing,
    sequencePlayList,
    playList,
    mode,
    currentIndex,
    showPlayList,
    currentSong
  } = useSelector((state: IApplicationState) => state.Player);
  const NormalPlayerProps = {
    song: currentSong,
    isFullScreen: isFullScreen,
    toggleFullScreen: (status: boolean) =>
      dispatch({ type: ActionType.SET_ISFULL_SCREEN, payload: status })
  };
  return (
    <section className="player-container">
      <NormalPlayer {...NormalPlayerProps} />
    </section>
  );
};

export default React.memo(Player);
