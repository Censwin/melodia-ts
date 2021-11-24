/*
 * @Date: 2021-11-24 15:32:17
 * @LastEditors: k200c
 * @LastEditTime: 2021-11-24 15:53:29
 * @Description: 排行榜
 * @FilePath: \melodia-ts\src\application\Rank\index.tsx
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router';
import { Header } from '../../baseUI';
const Rank = () => {
  const [showStatus, setShowStatus] = useState(true);
  const history = useHistory();
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={showStatus}
      appear={true}
      classNames="common-fade"
      timeout={300}
      unmountOnExit
      onExited={history.goBack}
      nodeRef={nodeRef}
    >
      <div className="rank-container" ref={nodeRef}>
        <Header title="排行榜" handleClick={() => setShowStatus(false)} />
      </div>
    </CSSTransition>
  );
};

export default React.memo(Rank);
