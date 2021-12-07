import React from 'react';
import { Route } from 'react-router';


export default (
    <Route>
        <Route path="/info" />

        <Route path="/products/:prodId" />

        <Route path="/lists/:listUrl" />

        <Route path="/order" />

        <Route path="/find" />

        <Route path="/gallery" />

        <Route path="/colors" />

        <Route exact path="/" />

    </Route>
);

