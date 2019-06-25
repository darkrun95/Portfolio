import React, { Component } from 'react';
import { NavigationBar } from '../component/NavigationBar';
import { Switch, Route } from 'react-router-dom';

class NavigationBarContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route path="/" component={ () => <NavigationBar /> } />
            </Switch>
        )
    }
}

export default NavigationBarContainer;
