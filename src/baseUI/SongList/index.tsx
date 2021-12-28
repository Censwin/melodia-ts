/*
 * @Date: 2021-12-13 17:39:31
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-28 11:25:23
 * @Description:
 * @FilePath: \melodia-ts\src\baseUI\SongList\index.tsx
 */
import classNames from 'classnames';
import React from 'react';
import { Icon } from '../../components';
import { getName } from '../../utils/tools';

interface ISongListProps {
  songs: any[];
  onClickCallback: Function;
  showNum?: boolean;
  className?: string;
}
const SongList: React.FC<ISongListProps> = (props) => {
  const { songs, showNum, className } = props;
  const { onClickCallback } = props;
  const wrapperClasses = classNames('songs-wrapper', className);
  const itemClasses = classNames('song-item', {
    isIndent: !showNum
  });
  return (
    <ul className={wrapperClasses}>
      {songs.map((item: any, index: number) => {
        const artist = item.ar || item.artists;
        const albumName = item.al ? item.al.name : item.album.name;
        return (
          <li key={item.name + index} onClick={(e) => onClickCallback(e, item)}>
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
  );
};

SongList.defaultProps = {
  showNum: true
};
export default SongList;
