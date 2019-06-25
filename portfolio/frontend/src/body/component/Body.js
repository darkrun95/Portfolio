import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';

export class Body extends Component {
	render() {
		return (
            <Switch>
                <Route exact path="/" component={ Home } />
            </Switch>
		);
	}
}
