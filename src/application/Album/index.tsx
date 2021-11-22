/*
 * @Date: 2021-11-19 16:54:40
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-22 11:26:33
 * @Description: 歌单 与 专辑 详情页
 * @FilePath: \melodia-ts\src\application\Album\index.tsx
 */
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router';

const Album: React.FC = () => {
  const history = useHistory();
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState('歌单');
  const handleExit = () => {};
  return (
    <CSSTransition
      in={showStatus}
      appear={true}
      classNames="common-fade"
      timeout={300}
      unmountOnExit
      onExited={history.goBack}
    >
      <div className="album-container">
        <h1>123</h1>
      </div>
    </CSSTransition>
  );
};

export default Album;
