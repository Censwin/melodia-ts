/*
 * @Author: Censwin
 * @Date: 2021-10-30 17:11:50
 * @LastEditTime: 2021-10-31 14:52:29
 * @Description:
 * @FilePath: /melodia-ts/src/store/index.ts
 */
import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware, compose, createStore } from 'redux';
import { RootReducers } from './reducers';
import rootSagas from './sagas';
const sagaMiddleware = createSagaMiddleware();
const composed = compose(applyMiddleware(sagaMiddleware));
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(RootReducers, composeEnhancers(composed));
sagaMiddleware.run(rootSagas);
