/*
 * @Date: 2021-11-24 10:37:41
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-24 11:48:15
 * @Description:
 * @FilePath: \melodia-ts\src\application\Album\store\index.ts
 */
import AlbumSagas from './sagas';
import reducer from './reducer';
import * as ActionTypes from './constants';
export * from './reducer';

export { reducer, ActionTypes, AlbumSagas };
