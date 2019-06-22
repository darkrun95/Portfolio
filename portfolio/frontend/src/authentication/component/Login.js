import React, { Component } from 'react';
import { Form, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthenticationFormContainer } from '../container/AuthenticationFormContainer';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.loginSubmit = this.loginSubmit.bind(this);

        this.state = {
            form_type: props.form_type,
            form_fields: props.form_fields,
        }
    }

    loginSubmit(data) {
        const { handleLoginCallback } = this.props;
        handleLoginCallback(data);
    }

	render() {
        const { form_type, form_fields } = this.state;

		return (
            <div className="inintoku-login-container container">
                <div className="inintoku-login-image-container">
                    <Image className="inintoku-login-image" src="/static/inintoku/img/login.jpg" fluid />
                </div>

                <AuthenticationFormContainer
                    form_type = { form_type }
                    form_fields = { form_fields }
                    genericFormCallback = { this.loginSubmit }  />

                <div className="form-group">
                    <div className="float-left">
                        <small>
                            New User? <strong><Link
                                className = "inintoku-color-blue"
                                to = {{
                                    pathname: "/sign-up/"
                                }} >Sign Up</Link></strong>
                        </small>
                    </div>

                    <div className="float-right">
                        <small>
                            <strong><Link
                                className = "inintoku-color-red"
                                to = {{
                                    pathname: "/forgot/"
                                }} >Forgot Password</Link></strong>
                        </small>
                    </div>
                </div>
            </div>
		);
	}
}
