/*
 * @Date: 2021-12-29 14:52:44
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-29 14:56:26
 * @Description:
 * @FilePath: \melodia-ts\src\services\singerApi.ts
 */
import Request from './index';
import { AxiosPromise } from 'axios';

export interface ISingerDataRes {
  artist: any;
  hotSongs: any[];
}

export const getSingerDataReq = (params: { id: number }): AxiosPromise<ISingerDataRes> => {
  return Request.request({
    url: '/artists',
    params
  });
};
