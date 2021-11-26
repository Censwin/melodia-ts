/*
 * @Date: 2021-11-25 17:07:01
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-25 17:41:16
 * @Description:
 * @FilePath: \melodia-ts\src\application\Rank\store\index.ts
 */
import RankSagas from './sagas';
import reducer from './reducer';
export * from './reducer';

export { reducer, RankSagas };
