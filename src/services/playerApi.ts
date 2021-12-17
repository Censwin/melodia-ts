/*
 * @Date: 2021-12-08 10:43:32
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-17 15:16:18
 * @Description:
 * @FilePath: \melodia-ts\src\services\playerApi.ts
 */
import { AxiosPromise } from 'axios';
import Request from '.';

interface ILyricReqParams {
  id: number;
}
interface Tlrc {
  lyric: string;
}
export interface ILyricRES {
  lrc: Tlrc;
}

export const getLyricReq = (params: ILyricReqParams): AxiosPromise<ILyricRES> => {
  return Request.request({
    url: `/lyric`,
    params: params
  });
};

export interface ISongDetailRes {
  songs: any[];
}
export const getSongDetailRequest = (id: string): AxiosPromise<ISongDetailRes> => {
  return Request.request({
    url: '/song/detail',
    params: {
      ids: id
    }
  });
};
