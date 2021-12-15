/*
 * @Date: 2021-12-15 14:03:14
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-15 14:05:09
 * @Description:
 * @FilePath: \melodia-ts\src\components\Tabs\TabNavList.tsx
 */
import React from 'react';
import TabContext from './TabContext';

function TabNavList() {
  const { tabs } = React.useContext(TabContext);
  const RenderTabNodes = (): React.ReactElement[] => {
    return tabs.map((tab, i) => {
      const { key } = tab;
      return <div></div>;
    });
  };

  return <div className="tabs-nav">{RenderTabNodes()}</div>;
}

export default TabNavList;
