/*
 * @Date: 2021-12-15 14:03:14
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-16 15:31:44
 * @Description:
 * @FilePath: \melodia-ts\src\components\Tabs\TabNavList.tsx
 */
import classNames from 'classnames';
import React from 'react';
import { HorizenScroll } from '../../baseUI';
import TabContext from './TabContext';

interface ITabNavListProps {
  ActiveKey: string;
  onTabClick: (activeKey: string, e: React.MouseEvent) => void;
}

function TabNavList(props: ITabNavListProps) {
  const { ActiveKey } = props;
  const { onTabClick } = props;
  const context = React.useContext(TabContext);
  if (!context) {
    return null;
  }
  const { tabs } = context;
  const RenderTabNodes = (): React.ReactElement[] => {
    return tabs.map((item, i) => {
      const { key, label } = item;
      const classes = classNames('r-cate-item horizen-item', {
        selected: ActiveKey === key
      });
      return (
        <span key={key} className={classes} onClick={(e) => onTabClick(key, e)}>
          {label}
        </span>
      );
    });
  };

  return (
    <div className="tabs-nav">
      <HorizenScroll>
        <div className="r-cate-wrapper">{RenderTabNodes()}</div>
      </HorizenScroll>
    </div>
  );
}

export default TabNavList;
