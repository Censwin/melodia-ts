/*
 * @Date: 2021-11-29 11:05:37
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-13 11:21:13
 * @Description:
 * @FilePath: \melodia-ts\src\application\Player\store\index.ts
 */
import sagas from './sagas';
import reducer from './reducer';
export * from './reducer';

export { reducer, sagas };
