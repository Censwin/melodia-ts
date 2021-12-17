/*
 * @Date: 2021-11-24 10:37:41
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-13 11:20:51
 * @Description:
 * @FilePath: \melodia-ts\src\application\Album\store\index.ts
 */
import sagas from './sagas';
import reducer from './reducer';
import * as ActionTypes from './constants';
export * from './reducer';

export { reducer, ActionTypes, sagas };
