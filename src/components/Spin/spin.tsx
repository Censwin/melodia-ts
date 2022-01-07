/*
 * @Date: 2022-01-07 11:01:35
 * @LastEditors: k200c
 * @LastEditTime: 2022-01-07 13:50:21
 * @Description:
 * @FilePath: \melodia-ts\src\components\Spin\spin.tsx
 */
import React from 'react';
import Icon from '../Icon/icon';

const Spin: React.FC = () => {
  return (
    <div className="spin-wrapper">
      <div className="spin-dot">
        <Icon icon="spinner" spin />
        <p>加载中</p>
      </div>
    </div>
  );
};

export default Spin;
