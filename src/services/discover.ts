/*
 * @Author: Censwin
 * @Date: 2021-11-14 21:29:17
 * @LastEditTime: 2021-11-15 16:41:06
 * @Description:
 * @FilePath: /melodia-ts/src/services/discover.ts
 */
import Request from './index';
import { AxiosPromise } from 'axios';

export interface IBannersRes {
  banners: any[];
}
export const getBannerList = (): AxiosPromise<IBannersRes> => {
  return Request.request({
    url: '/lkjljkljkljk'
  });
};
