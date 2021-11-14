/*
 * @Author: Censwin
 * @Date: 2021-11-14 12:09:49
 * @LastEditTime: 2021-11-14 21:55:30
 * @Description:
 * @FilePath: /melodia-ts/src/utils/request.ts
 */
import axios from 'axios';

let baseUrl = 'http://localhost:3000';
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3000';
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://localhost:3000';
}

axios.defaults.timeout = 5000;

const axiosInstance = axios.create({
  baseURL: baseUrl
});

axiosInstance.interceptors.request.use(
  (config) => {
    // if token config.header.token ....
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  (err) => {
    console.error(' error： ' + err);
  }
);

const request = (url: string, params?: { [key: string]: any }, callback?: Function) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url, {
        params
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { request };
