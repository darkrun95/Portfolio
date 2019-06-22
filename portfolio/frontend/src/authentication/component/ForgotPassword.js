import React, { Component } from 'react';
import { Form, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthenticationFormContainer } from '../container/AuthenticationFormContainer';

export class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.forgotPasswordSubmit = this.forgotPasswordSubmit.bind(this);

        this.state = {
            form_type: props.form_type,
            form_fields: props.form_fields,
        }
    }

    forgotPasswordSubmit(data) {
        const { handleForgotPasswordCallback } = this.props;
        handleForgotPasswordCallback(data);
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
                    genericFormCallback = { this.forgotPasswordSubmit }  />

                <div className="form-group">
                    <div className="float-left">
                        <small>
                             <strong><Link
                                className = "inintoku-color-blue"
                                to = {{
                                    pathname: "/login/"
                                }} >Back to Login</Link></strong>
                        </small>
                    </div>
                </div>
            </div>
		);
	}
}
