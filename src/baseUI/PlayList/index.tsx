/*
 * @Date: 2021-12-13 17:39:31
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-17 14:24:41
 * @Description:
 * @FilePath: \melodia-ts\src\baseUI\PlayList\index.tsx
 */
import classNames from 'classnames';
import React from 'react';
import { Icon } from '../../components';
import { getCount } from '../../utils/tools';
import LazyLoad, { forceCheck } from 'react-lazyload';
import defaultImg from './../../assets/img/defaultmusic.png';

interface IPlaylistProps {
  data: any[];
  onClickCallback: Function;
}
const CommonPlaylist: React.FC<IPlaylistProps> = (props) => {
  const { data } = props;
  const { onClickCallback } = props;
  return (
    <div className="playlist-wrapper">
      {data.map((item) => {
        return (
          <div key={item.id} className="playlist-item" onClick={(_) => onClickCallback(item.id)}>
            <div className="item-pic-wrapper">
              <LazyLoad placeholder={<img width="100%" height="100%" src={defaultImg} />}>
                <img className="playlist-item-pic" src={item.coverImgUrl + '?param=300x300'} />
              </LazyLoad>
            </div>
            <div className="play-count">
              <Icon icon="play" />
              {getCount(item.playCount)}
            </div>
            <span className="recommend-item-name">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CommonPlaylist;
