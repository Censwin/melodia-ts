/*
 * @Author: Censwin
 * @Date: 2021-10-28 23:23:22
 * @LastEditTime: 2021-12-17 23:25:00
 * @Description:
 * @FilePath: /melodia-ts/src/App.tsx
 */
import React, { useEffect, useRef } from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import routes from './routes/index';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  useEffect(() => {
    const target = document.getElementById('root');
    if (target) {
      const addAndRemove = function () {
        const audio: HTMLAudioElement = document.getElementById('my_audio') as HTMLAudioElement;
        if (audio) {
          audio
            .play()
            .then(() => {})
            .catch((error) => {});
          setTimeout(() => {
            audio.pause();
          }, 1);
        }
        setTimeout(() => {
          target.removeEventListener('click', addAndRemove);
        }, 1);
      };
      target.addEventListener('click', addAndRemove);
    }
  }, []);
  return (
    <Provider store={store}>
      <HashRouter>{renderRoutes(routes)}</HashRouter>
    </Provider>
  );
}

export default App;
