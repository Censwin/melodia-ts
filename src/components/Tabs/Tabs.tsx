import classNames from 'classnames';
import React from 'react';
import TabNavList from './TabNavList';
import TabPannelList, { ITabPaneProps } from './TabPannelList';
import type { ITab } from './interface';
import TabContext from './TabContext';

export interface ITabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

function parseTabList(children: React.ReactNode): ITab[] {
  const tabsArr = React.Children.toArray(children).map((node) => {
    if (React.isValidElement(node)) {
      const key = node.key !== undefined ? String(node.key) : undefined;
      return {
        key,
        node
      };
    }
    return null as any;
  });
  return tabsArr.filter((tab) => tab);
}

function Tabs({
  defaultActiveKey,
  className,
  style,
  onChange,
  children,
  ...otherprops
}: ITabsProps) {
  const tabs = parseTabList(children);

  const TabNavListProps = {};
  return (
    <TabContext.Provider value={{ tabs }}>
      <div className={classNames('beetle-tabs', className)} {...otherprops}>
        <TabNavList />
        <TabPannelList />
      </div>
    </TabContext.Provider>
  );
}
