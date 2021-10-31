/*
 * @Author: Censwin
 * @Date: 2021-10-30 17:12:13
 * @LastEditTime: 2021-10-31 14:42:19
 * @Description:
 * @FilePath: /melodia-ts/src/store/reducers.ts
 */

import { combineReducers } from 'redux';
import HomeReducer from './../application/Home/store/reducer';

export const RootReducers = combineReducers({
    HomeReducer
});
