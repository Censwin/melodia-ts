/*
 * @Author: Censwin
 * @Date: 2021-11-28 11:35:22
 * @LastEditTime: 2022-01-07 10:54:03
 * @Description:
 * @FilePath: \melodia-ts\src\application\Player\index.tsx
 */
import { abort } from 'process';
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../store/reducers';
import LyricFormater from '../../utils/lyric-creator';
import { createSongUrl, isEmptyObject } from '../../utils/tools';
import NormalPlayer from './component/normalPlayer';
import PlayList from './component/playList';
import { EPlayMode } from './store';
import * as ActionType from './store/constans';
const Player = () => {
  const [currentTime, setCurrentTime] = useState(0); // 当前时间
  const [durationTime, setDurationTime] = useState(0); // 总时长
  const [currentPlayingLyric, setPlayingLyric] = useState('');
  let ProgressPercent = currentTime / durationTime;
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(document.createElement('audio'));
  const songReady = useRef(true);
  const LyricRef = useRef<any>(null); // 歌词类的实例对象
  const currentLineRef = useRef(-1); // 当前行
  const {
    isFullScreen,
    playing,
    sequencePlayList,
    playList,
    playmode,
    currentIndex,
    showPlayList,
    currentSong,
    playmodeText,
    lrc
  } = useSelector((state: IApplicationState) => state.Player);

  const changePlayingState = (state: boolean) => {
    dispatch({ type: ActionType.SET_PLAYING_STATE, payload: state });

    if (LyricRef.current) {
      LyricRef.current.togglePlay(currentTime * 1000);
    }
  };

  const onProgressChange = (percent: number) => {
    const newTime = percent * durationTime;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    if (!playing) {
      changePlayingState(true);
    }
    if (LyricRef.current) {
      LyricRef.current.ProgressControl(newTime * 1000);
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
    changeCurrentIndex(newIndex);
    if (!playing) changePlayingState(true);
  };

  const nextSong = () => {
    if (playmode === EPlayMode.loop) {
      resetAudioTime();
      return;
    }
    if (playList.length === 1) {
      changePlayingState(false);
      return;
    }
    let newIndex = (currentIndex + 1) % playList.length;
    changeCurrentIndex(newIndex);
    if (!playing) changePlayingState(true);
  };

  const handleError = () => {
    songReady.current = true;
    console.log('播放出错');
  };

  const changeCurrentIndex = (index: number) => {
    dispatch({ type: ActionType.SET_CURRENT_INDEX, payload: index });
    dispatch({ type: ActionType.SET_CURRENT_SONG, payload: playList[index] });
  };

  const handleChangeMode = () => {
    let mode = (playmode + 1) % 3;
    dispatch({ type: ActionType.CHANGE_PLAYMODE, payload: mode });
  };
  const toggleFullScreen = (status: boolean) => {
    dispatch({ type: ActionType.SET_ISFULL_SCREEN, payload: status });
  };
  const toggleShowPlayList = (status: boolean) => {
    dispatch({ type: ActionType.SET_SHOW_PLAYLIST, payload: status });
  };

  const getSongLyric = (id: number) => {
    dispatch({ type: ActionType.GET_LYRIC, payload: { id } });
    if (LyricRef.current) {
      LyricRef.current.stop();
    }
  };
  // type TlyricCallBack = () => void
  interface ILParams {
    lineIndex: number;
    text: string;
  }
  const lyricCallBack = ({ lineIndex, text }: ILParams) => {
    if (!LyricRef.current) return;
    currentLineRef.current = lineIndex;
    setPlayingLyric(text);
  };

  useEffect(() => {
    if (!lrc) {
      LyricRef.current = null;
    } else {
      LyricRef.current = new LyricFormater(lrc, lyricCallBack);
      // LyricRef.current.play();
      currentLineRef.current = 0;
      LyricRef.current.ProgressControl(0);
      if (!playing) {
        LyricRef.current.stop();
      }
    }
  }, [lrc]);

  type audioState = 'play' | 'pause';
  const audioControler = (state: audioState) => {
    if (state === 'play') {
      audioRef.current
        .play()
        .then(() => {
          songReady.current = true;
          changePlayingState(true);
          console.log('audio played auto');
        })
        .catch((error) => {
          console.log('audio error:', error);
          changePlayingState(false);
        });
    } else {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    if (!currentSong) return;
    if (playList.length !== 0) {
      changeCurrentIndex(0);
    }
    // dispatch({ type: ActionType.SET_SHOW_PLAYLIST, payload: true });
  }, []);

  useEffect(() => {
    if (!playList.length || currentIndex === -1 || !songReady.current) return;
    const item = playList[currentIndex];
    songReady.current = false;
    const songUrl = createSongUrl(item.id);
    audioRef.current.src = songUrl;
    setTimeout(() => {
      audioControler('play');
    });
    changePlayingState(true);
    setCurrentTime(0);
    setDurationTime(item.dt / 1000);
    getSongLyric(item.id);
  }, [playList, currentIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    playing ? audioControler('play') : audioControler('pause');
  }, [playing]);

  const updateTime = (event: any) => {
    setCurrentTime(event.target.currentTime);
  };

  const handleDeleteSong = (e: React.MouseEvent, song: any) => {
    e.stopPropagation();
    dispatch({ type: ActionType.DEL_CURRENT_SONG, payload: { id: song.id } });
  };

  const NormalPlayerProps = {
    song: currentSong,
    isFullScreen: isFullScreen,
    toggleFullScreen,
    playing,
    handleClickPlay: changePlayingState,
    ProgressPercent,
    currentTime,
    durationTime,
    onProgressChange,
    lastSong,
    nextSong,
    handleChangeMode,
    playmode,
    showPlayList,
    toggleShowPlayList,
    currentPlayingLyric: currentPlayingLyric,
    currentLyric: LyricRef.current,
    currentLineNum: currentLineRef.current
  };

  const PlayListProps = {
    showPlayList,
    toggleShowPlayList,
    playList,
    playmodeText,
    currentIndex,
    changeCurrentIndex,
    handleDeleteSong
  };

  return (
    <section className="player-container">
      <PlayList {...PlayListProps} />
      {!isEmptyObject(currentSong) && <NormalPlayer {...NormalPlayerProps} />}
      <audio
        id="my_audio"
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={nextSong}
        onError={handleError}
      />
    </section>
  );
};

export default React.memo(Player);
