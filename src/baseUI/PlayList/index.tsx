/*
 * @Date: 2021-12-13 17:39:31
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-16 17:54:19
 * @Description:
 * @FilePath: \melodia-ts\src\baseUI\PlayList\index.tsx
 */
import classNames from 'classnames';
import React from 'react';
import { Icon } from '../../components';
import { getName } from '../../utils/tools';

interface IPlaylistProps {
  songs: any[];
  onClickCallback: Function;
  showNum?: boolean;
}
const SongList: React.FC<IPlaylistProps> = (props) => {
  const { songs, showNum } = props;
  const { onClickCallback } = props;
  const itemClasses = classNames('song-item', {
    isIndent: !showNum
  });
  return (
    <div className="playlist-wrapper">
      {
        // playLists.map((item) => {
        //   return (
        //     <div key={item.id} className="playlist-item" onClick={(_) => enterDetail(item.id)}>
        //       <div className="item-pic-wrapper">
        //         <LazyLoad placeholder={<img width="100%" height="100%" src={defaultImg} />}>
        //           <img className="playlist-item-pic" src={item.coverImgUrl + '?param=300x300'} />
        //         </LazyLoad>
        //       </div>
        //       <div className="play-count">
        //         <Icon icon="play" />
        //         {getCount(item.playCount)}
        //       </div>
        //       <span className="recommend-item-name">{item.name}</span>
        //     </div>
        //   );
        // })
      }
    </div>
  );
};

SongList.defaultProps = {
  showNum: true
};
export default SongList;
