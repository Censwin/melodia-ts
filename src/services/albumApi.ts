/*
 * @Date: 2021-11-24 10:05:01
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-24 10:16:40
 * @Description:
 * @FilePath: \melodia-ts\src\services\albumApi.ts
 */
import Request from './index';
import { AxiosPromise } from 'axios';

export interface IAlbumDetailParams {
  id: number;
}
export interface IAlbumDetailRes {
  playlist: any[];
}

export const getAlbumDetail = (params: IAlbumDetailParams): AxiosPromise<IAlbumDetailRes> => {
  return Request.request({
    url: '/playlist/detail',
    params: params
  });
};
