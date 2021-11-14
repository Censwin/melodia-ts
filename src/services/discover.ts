/*
 * @Author: Censwin
 * @Date: 2021-11-14 21:29:17
 * @LastEditTime: 2021-11-14 22:33:44
 * @Description:
 * @FilePath: /melodia-ts/src/services/discover.ts
 */
import { request } from '../utils/request';

export function getBannerList() {
  return request('/banner');
}
