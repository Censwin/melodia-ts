/*
 * @Author: Censwin
 * @Date: 2021-11-14 21:29:17
 * @LastEditTime: 2021-11-18 14:45:54
 * @Description:
 * @FilePath: \melodia-ts\src\services\discoverApi.ts
 */
import Request from './index';
import { AxiosPromise } from 'axios';
export interface IBannerRes {
  banners: any[];
}

export interface IRecommendListRes {
  result: any[];
}

export const getBannerList = (): AxiosPromise<IBannerRes> => {
  return Request.request({
    url: '/banner'
  });
};

export const getRecommendList = (): AxiosPromise<IRecommendListRes> => {
  return Request.request({
    url: '/personalized?limit=10'
  });
};
