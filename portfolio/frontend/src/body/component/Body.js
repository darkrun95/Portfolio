import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginContainer from '../../authentication/container/LoginContainer';
import LogOutContainer from '../../authentication/container/LogOutContainer';
import SignUpContainer from '../../authentication/container/SignUpContainer';
import ForgotPasswordContainer from '../../authentication/container/ForgotPasswordContainer';
import ResetPasswordContainer from '../../authentication/container/ResetPasswordContainer';
import ValidateUserContainer from '../../authentication/container/ValidateUserContainer';

import Home from './Home';

export class Body extends Component {
	render() {
		return (
            <Switch>
                <Route exact path="/" component={ Home }/>
                /* Authentication Routes */
                <Route path="/login" component={ LoginContainer }/>
                <Route path="/logout" component={ LogOutContainer }/>
                <Route path="/sign-up" component={ SignUpContainer }/>
                <Route path="/forgot" component={ ForgotPasswordContainer }/>
                <Route path="/resetpassword/:userid/:resettoken" component={ ResetPasswordContainer }/>
                <Route path="/validateuser/:userid/:validationtoken" component={ ValidateUserContainer }/>
            </Switch>
		);
	}
}
