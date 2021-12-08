/*
 * @Date: 2021-12-08 10:43:32
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-08 11:27:13
 * @Description:
 * @FilePath: \melodia-ts\src\services\playerApi.ts
 */
import { AxiosPromise } from 'axios';
import Requset from '.';

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
  return Requset.request({
    url: `/lyric`,
    params: params
  });
};
