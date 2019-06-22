import React, { Component } from 'react';
import { NavigationBar } from '../component/NavigationBar';
import { Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';

class NavigationBarContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const logged_in = localStorage.getItem('token') ? true : false
        if (prevState.logged_in !== logged_in) {
            this.setState({
                logged_in: logged_in,
            })
        }
    }

    render() {
        const { logged_in } = this.state;
        return (
            <Switch>
                <Route path="/" component={ () => <NavigationBar logged_in={ logged_in }/> } />
            </Switch>
        )
    }
}

export default NavigationBarContainer;
