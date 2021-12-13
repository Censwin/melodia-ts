/*
 * @Date: 2021-12-13 11:24:45
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-13 15:07:42
 * @Description:
 * @FilePath: \melodia-ts\src\services\searchApi.ts
 */
import { AxiosPromise } from 'axios';
import Request from './index';

export interface IHotkeysRes {
  result: {
    hots: any[];
  };
}
export const getHotKeysRequest = (): AxiosPromise<IHotkeysRes> => {
  return Request.request({
    url: '/search/hot'
  });
};

export interface ISuggestRes {
  result: any[];
}
export const getSuggestListRequest = (value: string): AxiosPromise<ISuggestRes> => {
  return Request.request({
    url: '/search/suggest',
    params: {
      keywords: value
    }
  });
};

export interface ISearchRes {
  result: {
    songs: any[];
  };
}
export const getSearchResultRequest = (value: string): AxiosPromise<ISearchRes> => {
  return Request.request({
    url: '/search',
    params: {
      keywords: value
    }
  });
};
