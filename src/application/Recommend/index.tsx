import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../../baseUI/Header/header';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router';
const Recommend: React.FC = (props) => {
  const [show, setshow] = useState(false);
  const history = useHistory();
  const containerRef = useRef(null);
  useEffect(() => {
    setshow(true);
  }, []);
  const handleBack = useCallback(() => {
    setshow(false);
  }, []);
  return (
    <CSSTransition
      nodeRef={containerRef} // TRG issue 668
      in={show}
      timeout={300}
      classNames="recommend-fade"
      unmountOnExit
      appear={true}
      onExited={history.goBack}
    >
      <div className="recommend-container" ref={containerRef}>
        <Header title="歌单广场" handleClick={handleBack} />
      </div>
    </CSSTransition>
  );
};

export default React.memo(Recommend);
