import React, { Component, ReactNode } from 'react';

import { Switch, Route } from 'react-router-dom';
import Discover from '../application/Discover';
import Home from '../application/Home';

const RenderRoute = () => {
    return (
        <Route exact path="/" component={Home}>
            <Route path="/discover" component={Discover} />
        </Route>
    );
};

export default RenderRoute;
