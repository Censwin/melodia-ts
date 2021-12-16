/*
 * @Date: 2021-12-15 14:37:15
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-16 14:33:29
 * @Description:
 * @FilePath: \melodia-ts\src\components\Tabs\TabContext.ts
 */
import React, { createContext } from 'react';
import type { ITab } from './interface';

export interface TabContextProps {
  tabs: ITab[];
}

export default createContext<TabContextProps | null>(null);
