/*
 * @Author: Censwin
 * @Date: 2021-10-28 23:23:22
 * @LastEditTime: 2021-12-02 13:38:51
 * @Description:
 * @FilePath: \melodia-ts\src\App.tsx
 */
import React, { useEffect, useRef } from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import routes from './routes/index';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  //   const clicked = useRef(false);
  //   useEffect(() => {
  //     const target = document.getElementById('root');
  //     if (target) {
  //       const addAndRemove = function () {
  //         console.log(1);
  //         const audio: Partial<HTMLAudioElement> = document.createElement('audio');
  //         if (audio.play && audio.pause) {
  //           audio
  //             .play()
  //             .then((_) => console.log(1))
  //             .catch((e) => console.log('eeeor:', e));
  //           audio.pause();
  //         }
  //         setTimeout(() => {
  //           target.removeEventListener('touchstart', addAndRemove);
  //         }, 1);
  //       };
  //       target.addEventListener('touchstart', addAndRemove);
  //       //   if (!clicked.current) {
  //       //     setTimeout(() => {
  //       //       target.click();
  //       //       clicked.current = true;
  //       //     }, 10);
  //       //   }
  //     }
  //   }, []);
  return (
    <Provider store={store}>
      <HashRouter>{renderRoutes(routes)}</HashRouter>
    </Provider>
  );
}

export default App;
