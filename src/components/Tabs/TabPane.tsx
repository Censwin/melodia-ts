/*
 * @Date: 2021-12-16 14:15:24
 * @LastEditors: k200c
 * @LastEditTime: 2021-12-16 16:16:42
 * @Description:
 * @FilePath: \melodia-ts\src\components\Tabs\TabPane.tsx
 */
import classNames from 'classnames';
import React from 'react';

export interface ITabPaneProps {
  label?: string;
  activeKey?: string;
  children?: React.ReactNode;
  active?: boolean;
  forceRender?: boolean;
}

function TabPanne(props: ITabPaneProps) {
  const { activeKey, children, active, forceRender } = props;
  const [visited, setVisited] = React.useState(forceRender);

  React.useEffect(() => {
    if (active) {
      setVisited(true);
    }
  }, [active]);

  const classes = classNames('tab-tabpane', {
    'tabpane-active': active
  });
  const mergedStyle: React.CSSProperties = {};
  if (!active) {
    mergedStyle.visibility = 'hidden';
    mergedStyle.height = 0;
    mergedStyle.overflowY = 'hidden';
  }
  return (
    <div className={classes} style={mergedStyle}>
      {active && children}
    </div>
  );
}

export default TabPanne;
