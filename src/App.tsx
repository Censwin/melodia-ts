import React from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import routes from './routes/index';
function App() {
    return (
        <HashRouter>
            <div className="App">{routes()}</div>
        </HashRouter>
    );
}

export default App;
