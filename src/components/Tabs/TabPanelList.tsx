/*
 * @Date: 2021-12-15 14:06:23
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-16 16:09:16
 * @Description:
 * @FilePath: \melodia-ts\src\components\Tabs\TabPanelList.tsx
 */
import React from 'react';
import TabContext from './TabContext';

export interface ITabPaneListProps {
  ActiveKey?: string;
}

function TabPannelList({ ActiveKey }: ITabPaneListProps) {
  const context = React.useContext(TabContext);
  if (!context) {
    return null;
  }
  const { tabs } = context;
  const activeIndex = tabs.findIndex((tab) => tab.key === ActiveKey);
  return (
    <div className="tab-content-wrapper">
      <div className="tab-content" style={activeIndex ? { marginLeft: `-${activeIndex}00%` } : {}}>
        {tabs.map((tab) => {
          return React.cloneElement(tab.node, {
            key: tab.key,
            tabKey: tab.key,
            active: tab.key === ActiveKey
          });
        })}
      </div>
    </div>
  );
}

export default TabPannelList;
