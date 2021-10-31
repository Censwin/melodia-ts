/*
 * @Author: Censwin
 * @Date: 2021-10-28 23:23:22
 * @LastEditTime: 2021-10-31 14:47:37
 * @Description:
 * @FilePath: /melodia-ts/src/App.tsx
 */
import React from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import routes from './routes/index';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
    return (
        <Provider store={store}>
            <HashRouter>{renderRoutes(routes)}</HashRouter>
        </Provider>
    );
}

export default App;
