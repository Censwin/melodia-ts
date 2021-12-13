/*
 * @Date: 2021-12-13 17:39:31
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-13 18:21:52
 * @Description:
 * @FilePath: \melodia-ts\src\baseUI\SongList\index.tsx
 */
import React from 'react';
import { Icon } from '../../components';
import { getName } from '../../utils/tools';

interface ISongListProps {
  songs: any[];
  onClickCallback: Function;
}

const SongList: React.FC<ISongListProps> = (props) => {
  const { songs } = props;
  const { onClickCallback } = props;
  console.log(songs);
  return (
    <ul className="songs-wrapper">
      {songs.map((item: any, index: number) => {
        return (
          <li key={item.name + index} onClick={(e) => onClickCallback(e, item)}>
            <span className="index">{index + 1}</span>
            <div className="song-item">
              <span className="song-name">{item.name}</span>
              <span className="singer-name">
                <Icon icon="h-square" />
                {getName(item.ar || item.artists)} - {item.al.name || item.album.name}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default SongList;
