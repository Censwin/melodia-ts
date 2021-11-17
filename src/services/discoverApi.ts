/*
 * @Author: Censwin
 * @Date: 2021-11-14 21:29:17
 * @LastEditTime: 2021-11-16 15:54:10
 * @Description:
 * @FilePath: /melodia-ts/src/services/discover.ts
 */
import Request from './index';
import { AxiosPromise } from 'axios';
import { IBannerRes, IRecommendListRes } from '../application/Discover/store/types';

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
