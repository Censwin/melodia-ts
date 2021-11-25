/*
 * @Date: 2021-11-25 14:21:44
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-25 16:25:21
 * @Description:
 * @FilePath: \melodia-ts\src\services\rankApi.ts
 */
import Request from './index';
import { AxiosPromise } from 'axios';

export const getRankList = () => {
  return Request.request({
    url: `/toplist/detail`
  });
};
