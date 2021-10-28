import React from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import routes from './routes/index';
import { renderRoutes } from 'react-router-config';

function App() {
    return <HashRouter>{renderRoutes(routes)}</HashRouter>;
}

export default App;
