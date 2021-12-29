/*
 * @Date: 2021-11-17 14:47:57
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-29 15:49:05
 * @Description:
 * @FilePath: \melodia-ts\src\utils\tools.ts
 */
import React from 'react';
import * as ReactIs from 'react-is';

export const debounce = () => {};

export const getCount = (count: number) => {
  if (count < 0) return;
  if (count < 10000) return count;
  let a;
  if (count < 10000 * 10000) {
    a = Math.ceil(count / 10000);
    return `${a}万`;
  }
  a = Math.ceil(count / (10000 * 10000));
  return `${a}亿`;
};

export const getName = (nameArr: { name: string }[]) => {
  return nameArr.reduce((text, currentValue) => {
    return text + ' ' + currentValue.name;
  }, '');
};

export const isEmptyObject = (obj: any) => {
  return (
    !obj ||
    obj.constructor === Array ||
    (obj.constructor === Object && Object.keys(obj).length === 0)
  );
};

export const filterRankList = (list: Array<any>) => {
  // const recommend = ['云音乐欧美热歌榜', '云音乐韩语榜', '美国Billboard榜']; // 推荐榜
  const choiceness = ['黑胶VIP爱听榜', '网络热歌榜', 'KTV唛榜']; // 精选榜
  const musicstyle = [
    '云音乐电音榜',
    '云音乐ACG榜',
    '云音乐说唱榜',
    '云音乐摇滚榜',
    '云音乐民谣榜',
    '云音乐国电榜',
    '云音乐古典榜',
    '云音乐古风榜',
    '中文DJ榜'
  ]; // 曲风榜
  const global = [
    '美国Billboard榜',
    'UK排行榜周榜',
    '日本Oricon榜',
    '法国 NRJ Vos Hits 周榜',
    '俄罗斯top hit流行音乐榜',
    '云音乐欧美新歌榜',
    '云音乐欧美热歌榜',
    '云音乐日语榜',
    '云音乐韩语榜',
    '俄语榜',
    '越南语榜'
  ]; // 全球榜
  let index;
  let officialList = []; // 官方榜
  let choicenessList = [];
  let musicstyleList = [];
  let globalList = [];
  let specialList = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].tracks.length && !list[i + 1].tracks.length) {
      index = i + 1;
      break;
    }
  }
  officialList = list.slice(0, index);
  let list2 = list.slice(index);
  for (const cur of list2) {
    if (choiceness.some((name) => name === cur.name)) {
      choicenessList.push(cur);
      continue;
    } else if (musicstyle.some((name) => name === cur.name)) {
      musicstyleList.push(cur);
      continue;
    } else if (global.some((name) => name === cur.name)) {
      globalList.push(cur);
      continue;
    } else {
      specialList.push(cur);
    }
  }
  return [officialList, choicenessList, musicstyleList, globalList, specialList];
};

let vendor = (() => {
  // 通过 transition 属性判断浏览器
  let elementStyle = document.createElement('div').style;
  interface TransformNamesInterface {
    webkit: string;
    Moz: string;
    O: string;
    ms: string;
    standard: string;
    [key: string]: any;
  }
  let transformNames: TransformNamesInterface = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransfrom',
    ms: 'msTransform',
    standard: 'Transform'
  };
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

export function prefixStyle(style: string): string {
  if (vendor === false) {
    return '';
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

export function createSongUrl(id: string): string {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

export const formatPlayTime = (interval: any) => {
  let _interval = interval | 0; // |0表示向下取整
  const minute = (_interval / 60) | 0;
  const second = (_interval % 60).toString().padStart(2, '0');
  return `${minute}:${second}`;
};

export const findCurrentIndex = (current: any, list: Array<any>) => {
  return list.findIndex((item) => item.id === current.id);
};

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
export type TShuffle = <T>(arr: T[]) => T[];
export const shuffle: TShuffle = (arr) => {
  const newArr = [...arr];
  let [m, i] = [newArr.length, 0];
  while (m) {
    i = (Math.random() * m--) >>> 0;
    [newArr[m], newArr[i]] = [newArr[i], newArr[m]];
  }
  return newArr;
};

export const getResOrderLable = (arr: string[]) => {
  const newArr = arr.map((item) => {
    switch (item) {
      case 'songs':
        return '歌曲';
      case 'artists':
        return '歌手';
      case 'albums':
        return '专辑';
      case 'playlists':
        return '歌单';
      default:
        return '--';
    }
  });
  return newArr;
};

export interface Option {
  keepEmpty?: boolean;
}

export default function ChildrenToArray(
  children: React.ReactNode,
  option: Option = {}
): React.ReactElement[] {
  let ret: React.ReactElement[] = [];

  React.Children.forEach(children, (child: any) => {
    if ((child === undefined || child === null) && !option.keepEmpty) {
      return;
    }

    if (Array.isArray(child)) {
      ret = ret.concat(ChildrenToArray(child));
    } else if (ReactIs.isFragment(child) && child.props) {
      ret = ret.concat(ChildrenToArray(child.props.children, option));
    } else {
      ret.push(child);
    }
  });

  return ret;
}
