import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import TabNavList from './TabNavList';
import TabPannelList from './TabPanelList';
import type { ITab } from './interface';
import TabContext from './TabContext';
import ChildrenToArray from '../../utils/tools';
import type { ITabPaneProps } from './TabPane';
export interface ITabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  onTabClick?: (activeKey: string, e: React.MouseEvent) => void;
}

function parseTabList(children: React.ReactNode): ITab[] {
  const tabsArr = ChildrenToArray(children).map((node: React.ReactElement<ITabPaneProps>) => {
    if (React.isValidElement(node)) {
      const key = node.key !== undefined ? String(node.key) : undefined;
      return {
        key,
        ...node.props,
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
  onTabClick,
  ...otherprops
}: ITabsProps) {
  const tabs = parseTabList(children);
  // console.dir(tabs)
  const memoContext = useMemo(() => ({ tabs }), [tabs]);
  // console.log()

  const [ActiveKey, setActiveKey] = useState(tabs[0]?.key);

  const shareProps = {
    ActiveKey
  };

  const onInternalTabClick = (key: string, e: React.MouseEvent) => {
    if (onTabClick) {
      onTabClick(key, e);
    }
    if (key !== ActiveKey) {
      setActiveKey(key);
    }
  };
  const TabNavProps = {
    ...shareProps,
    onTabClick: onInternalTabClick
  };

  const TabPaneListProps = {
    ...shareProps
  };
  return (
    <TabContext.Provider value={memoContext}>
      <div className={classNames('beetle-tabs', className)} {...otherprops}>
        <TabNavList {...TabNavProps} />
        <TabPannelList {...TabPaneListProps} />
      </div>
    </TabContext.Provider>
  );
}

export default Tabs;
