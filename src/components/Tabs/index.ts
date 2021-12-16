/*
 * @Date: 2021-12-16 14:02:13
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-16 14:20:00
 * @Description:
 * @FilePath: \melodia-ts\src\components\Tabs\index.ts
 */
import _Tabs from './Tabs';
import { FC } from 'react';
import type { ITabsProps } from './Tabs';
import type { ITabPaneProps } from './TabPane';
import TabPane from './TabPane';

type ITabsComponent = FC<ITabsProps> & {
  Item: FC<ITabPaneProps>;
};

const Tabs = _Tabs as ITabsComponent;
Tabs.Item = TabPane;

export default Tabs;
