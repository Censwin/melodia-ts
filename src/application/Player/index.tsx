/*
 * @Author: Censwin
 * @Date: 2021-11-28 11:35:22
 * @LastEditTime: 2021-12-02 16:32:39
 * @Description:
 * @FilePath: \melodia-ts\src\application\Player\index.tsx
 */
import { abort } from 'process';
import React, { useRef, useState, useEffect, MediaHTMLAttributes } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../store/reducers';
import { createSongUrl, isEmptyObject } from '../../utils/tools';
import NormalPlayer from './component/normalPlayer';
import { EPlayMode } from './store';
import * as ActionType from './store/constans';
const Player = () => {
  const [currentTime, setCurrentTime] = useState(0); // 当前时间
  const [durationTime, setDurationTime] = useState(0); // 总时长
  let ProgressPercent = currentTime / durationTime;
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(document.createElement('audio'));
  const songReady = useRef(false);
  const {
    isFullScreen,
    playing,
    sequencePlayList,
    playList,
    playmode,
    currentIndex,
    showPlayList,
    currentSong
  } = useSelector((state: IApplicationState) => state.Player);

  const changePlayingState = (state: boolean) => {
    dispatch({ type: ActionType.SET_PLAYING_STATE, payload: state });
  };

  const onProgressChange = (percent: number) => {
    const newTime = percent * durationTime;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    if (!playing) {
      changePlayingState(true);
    }
  };

  const resetAudioTime = () => {
    audioRef.current.currentTime = 0;
  };

  const lastSong = () => {
    if (currentIndex <= 0) return;
    if (playmode === EPlayMode.loop) {
      resetAudioTime();
      return;
    }
    const newIndex = currentIndex - 1;
    dispatch({ type: ActionType.SET_CURRENT_INDEX, payload: newIndex });
    dispatch({ type: ActionType.SET_CURRENT_SONG, payload: playList[newIndex] });
    if (!playing) changePlayingState(true);
  };

  const nextSong = () => {
    if (playmode === EPlayMode.loop) {
      resetAudioTime();
      return;
    }
    let newIndex = (currentIndex + 1) % playList.length;
    // if (newIndex > playList.length - 1) newIndex = currentIndex;
    dispatch({ type: ActionType.SET_CURRENT_INDEX, payload: newIndex });
    dispatch({ type: ActionType.SET_CURRENT_SONG, payload: playList[newIndex] });
    if (!playing) changePlayingState(true);
  };

  const handleChangeMode = () => {
    let mode = (playmode + 1) % 3;
    dispatch({ type: ActionType.CHANGE_PLAYMODE, payload: mode });
  };

  const NormalPlayerProps = {
    song: currentSong,
    isFullScreen: isFullScreen,
    toggleFullScreen: (status: boolean) =>
      dispatch({ type: ActionType.SET_ISFULL_SCREEN, payload: status }),
    playing,
    handleClickPlay: changePlayingState,
    ProgressPercent,
    currentTime,
    durationTime,
    onProgressChange,
    lastSong,
    nextSong,
    handleChangeMode,
    playmode
  };

  type audioState = 'play' | 'pause';
  const audioControler = (state: audioState) => {
    if (state === 'play') {
      audioRef.current
        .play()
        .then((_) => {
          console.log('audio played auto');
        })
        .catch((error) => {
          console.log('audio error:', error);
        });
    } else {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    if (!currentSong) return;
    dispatch({ type: ActionType.SET_CURRENT_INDEX, payload: 0 });
    dispatch({ type: ActionType.SET_CURRENT_SONG, payload: playList[0] });
  }, []);

  useEffect(() => {
    if (!playList.length || currentIndex === -1) return;
    const item = playList[currentIndex];
    songReady.current = false;
    const songUrl = createSongUrl(item.id);
    audioRef.current.src = songUrl;
    // setTimeout(() => {
    //   audioControler('play');
    // });
    // changePlayingState(true);
    setCurrentTime(0);
    setDurationTime(item.dt / 1000);
  }, [playList, currentIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    playing ? audioControler('play') : audioControler('pause');
  }, [playing]);

  const updateTime = (event: any) => {
    setCurrentTime(event.target.currentTime);
  };

  return (
    <section className="player-container">
      {!isEmptyObject(currentSong) && <NormalPlayer {...NormalPlayerProps} />}
      <audio
        id="my_audio"
        ref={audioRef}
        onTimeUpdate={updateTime}
        muted={true}
        onEnded={nextSong}
      />
    </section>
  );
};

export default React.memo(Player);
