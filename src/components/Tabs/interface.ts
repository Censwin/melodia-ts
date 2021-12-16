/*
 * @Date: 2021-12-15 14:58:01
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-16 14:18:30
 * @Description:
 * @FilePath: \melodia-ts\src\components\Tabs\interface.ts
 */
import React from 'react';
import type { ITabPaneProps } from './TabPane';

export interface ITab extends ITabPaneProps {
  key: string;
  node: React.ReactElement;
}
