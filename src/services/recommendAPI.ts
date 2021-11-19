/*
 * @Date: 2021-11-18 14:31:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-18 16:59:46
 * @Description:
 * @FilePath: \melodia-ts\src\services\recommendAPI.ts
 */
import Request from './index';
import { AxiosPromise } from 'axios';

export interface IHotCateRes {
  tags: any[];
}
export const getHotCateList = (): AxiosPromise<IHotCateRes> => {
  return Request.request({
    url: '/playlist/hot'
  });
};

export interface IPlayListParams {
  cat?: string;
  limit?: number;
}
export interface IPlayListRes {
  playlists: any[];
}
export const getPlayLists = (params: IPlayListParams): AxiosPromise<IPlayListRes> => {
  return Request.request({
    url: '/top/playlist',
    params: params
  });
};
