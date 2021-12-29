/*
 * @Date: 2021-12-13 17:39:31
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-29 15:31:28
 * @Description:
 * @FilePath: \melodia-ts\src\baseUI\SongList\index.tsx
 */
import classNames from 'classnames';
import React, { useRef } from 'react';
import { Icon } from '../../components';
import { getName } from '../../utils/tools';
import MusicNote from '../musicNote';

interface ISongListProps {
  songs: any[];
  onClickCallback: Function;
  showNum?: boolean;
  className?: string;
  showPlayAll?: boolean;
  onClickPlayAll?: Function;
}
const SongList: React.FC<ISongListProps> = (props) => {
  const { songs, showNum, className, showPlayAll } = props;
  const { onClickCallback, onClickPlayAll } = props;
  const wrapperClasses = classNames('songs-wrapper', className);
  const itemClasses = classNames('song-item', {
    isIndent: !showNum
  });
  const musicNoteRef = useRef<any>();
  const handleClickSong = (event: React.MouseEvent, item: any) => {
    if (musicNoteRef.current) {
      musicNoteRef.current.startAnimation(event.nativeEvent.clientY);
    }
    onClickCallback(event, item);
  };
  return (
    <>
      <section className={wrapperClasses}>
        {showPlayAll && (
          <article className="first-line">
            <div
              className="play-all"
              onClick={() => {
                if (onClickPlayAll) onClickPlayAll();
              }}
            >
              <span className="playicon">
                <Icon icon="play-circle" />
              </span>
              <span>
                {' '}
                播放全部 <span className="sum">({songs.length})</span>
              </span>
            </div>
          </article>
        )}
        <ul className="songs-ul">
          {songs.map((item: any, index: number) => {
            const artist = item.ar || item.artists;
            const albumName = item.al ? item.al.name : item.album.name;
            return (
              <li key={item.name + index} onClick={(e) => handleClickSong(e, item)}>
                {showNum && <span className="index">{index + 1}</span>}
                <div className={itemClasses}>
                  <span className="song-name">{item.name}</span>
                  <span className="singer-name">
                    <Icon icon="h-square" />
                    {getName(artist)} - {albumName}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <MusicNote ref={musicNoteRef} />
    </>
  );
};

SongList.defaultProps = {
  showNum: true,
  showPlayAll: false
};
export default SongList;
