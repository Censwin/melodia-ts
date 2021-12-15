/*
 * @Date: 2021-12-15 14:58:01
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-15 16:25:57
 * @Description:
 * @FilePath: \melodia-ts\src\components\Tabs\interface.ts
 */
import React from 'react';
import type { ITabPaneProps } from './TabPannelList';

export interface ITab extends ITabPaneProps {
  key: string;
  node: React.ReactElement;
}
