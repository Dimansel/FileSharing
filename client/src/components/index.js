/* eslint-disable react/jsx-no-bind, react/no-multi-comp*/

import React, { Component } from 'react';
import { Switch } from 'react-router';
import { Router } from 'react-router-dom';

// import Controller from '../utils/components/Controller';
import history from '../utils/history';

export default class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    {/* <Controller path='/' exact Components={[ Main, Cellar ]} /> */}
                </Switch>
            </Router>
        );
    }
}
