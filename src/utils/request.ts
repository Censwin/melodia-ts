import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://www.baidu.com';
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://www.baidu.com';
}

axios.defaults.timeout = 5000;

const request = (url: string, params: { [key: string]: any }, callback: Function) => {
  return;
};
