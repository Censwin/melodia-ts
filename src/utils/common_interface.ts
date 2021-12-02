/*
 * @Date: 2021-11-17 14:47:57
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-02 13:57:51
 * @Description:
 * @FilePath: \melodia-ts\src\utils\common_interface.ts
 */
import React from 'react';
import { Action } from 'redux';
export interface INativeProps<S extends string = never> {
  className?: string;
  style?: React.CSSProperties & Partial<Record<S, string>>;
  tabIndex?: number;
}

export interface ICOMMONACTION extends Action {
  payload: any;
}
