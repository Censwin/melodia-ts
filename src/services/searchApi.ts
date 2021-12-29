/*
 * @Date: 2021-12-13 11:24:45
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-29 16:36:48
 * @Description:
 * @FilePath: \melodia-ts\src\services\searchApi.ts
 */
import { AxiosPromise } from 'axios';
import Request from './index';

export interface IHotkeysRes {
  result: {
    hots: any[];
  };
}
export const getHotKeysRequest = (): AxiosPromise<IHotkeysRes> => {
  return Request.request({
    url: '/search/hot'
  });
};

export interface ISuggest {
  albums?: { id: number; name: string }[]; // 专辑：// 信息不完整
  artists?: { id: number; name: string; picUrl: string }[]; // 歌手信息
  order?: string[]; // 标签如：  ["songs", "artists", "albums", "playlists"]
  playlists?: { id: number; name: string; playCount: number; coverImgUrl: string }[]; // 歌单
  songs?: any[]; // 歌曲：信息不完整
}
export interface ISuggestRes {
  result: ISuggest;
}
export const getSuggestListRequest = (value: string): AxiosPromise<ISuggestRes> => {
  return Request.request({
    url: '/search/suggest',
    params: {
      keywords: value
    }
  });
};

export interface ISearchRes {
  result: {
    songs: any[];
  };
}
export const getSearchResultRequest = (value: string): AxiosPromise<ISearchRes> => {
  return Request.request({
    url: '/search',
    params: {
      keywords: value
    }
  });
};
