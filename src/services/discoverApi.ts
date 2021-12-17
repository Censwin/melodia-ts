/*
 * @Author: Censwin
 * @Date: 2021-11-14 21:29:17
 * @LastEditTime: 2021-12-09 16:59:27
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

export interface IVideoRes {
  urls: {
    url: string;
  }[];
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

export const getVideoUrlReq = (): AxiosPromise<any> => {
  return Request.request({
    url: '/video/url',
    params: {
      id: '89ADDE33C0AAE8EC14B99F6750DB954D'
    }
  });
};
