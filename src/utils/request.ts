/*
 * @Author: Censwin
 * @Date: 2021-11-14 12:09:49
 * @LastEditTime: 2021-11-30 22:52:08
 * @Description:
 * @FilePath: /melodia-ts/src/utils/request.ts
 */
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';

// let apiBaseUrl = 'http://localhost:3000';
let apiBaseUrl = 'http://192.168.43.239:3000';
if (process.env.NODE_ENV === 'development') {
  // apiBaseUrl = 'http://localhost:3000';
} else if (process.env.NODE_ENV === 'production') {
  // apiBaseUrl = 'http://localhost:3000';
}
axios.defaults.timeout = 5000;
class HttpRequest {
  public baseUrl: string;
  public constructor(baseUrl = apiBaseUrl) {
    this.baseUrl = baseUrl;
  }
  public request(options: AxiosRequestConfig): AxiosPromise {
    const axiosInstance: AxiosInstance = axios.create();
    const _options = this.mergeOptions(options);
    this.interceptors(axiosInstance, _options.url);
    return axiosInstance(_options);
  }
  private interceptors(axiosInstance: AxiosInstance, url?: string) {
    // 定义这个函数用于添加全局请求和响应拦截逻辑
    axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // if token config.header.token ....
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // 返回拦截
    axiosInstance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (res.status === 200) {
          const { data } = res;
          if (data.code !== 200) {
            console.error('请求错误:', res);
          }
          return res.data;
        }
      },
      (err) => {
        // throw new Error('请求错误' + err);
        // console.error('请求错误: ' + err);
        // return false;
        return Promise.reject(err);
        // return Promise.resolve(err);
      }
    );
  }
  private mergeOptions(options: AxiosRequestConfig): AxiosRequestConfig {
    return { baseURL: this.baseUrl, ...options };
  }
}
export interface ResponseData {
  code: number;
  data?: any;
}
export default HttpRequest;
