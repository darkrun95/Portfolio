import React, { Component } from 'react';
import { Form, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthenticationFormContainer } from '../container/AuthenticationFormContainer';
import { _ } from 'underscore';

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.signUpSubmit = this.signUpSubmit.bind(this);

        this.state = {
            form_type: props.form_type,
            form_fields: props.form_fields,
            validation_flag: props.validation_flag,
            messages: props.messages,
        }
    }

    signUpSubmit(data) {
        const { handleSignUpCallback } = this.props;
        handleSignUpCallback(data);
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                validation_flag: this.props.validation_flag,
                messages: this.props.messages
            })
        }
    }

	render() {
        const { form_type, form_fields, validation_flag, messages } = this.state;

		return (
            <div className="inintoku-login-container container">
                <div className="inintoku-login-image-container">
                    <Image className="inintoku-login-image" src="/static/inintoku/img/login.jpg" fluid />
                </div>

                <AuthenticationFormContainer
                    form_type = { form_type }
                    form_fields = { form_fields }
                    validation_flag = { validation_flag }
                    messages = { messages }
                    genericFormCallback = { this.signUpSubmit }  />

                <div className="form-group">
                    <div className="float-left">
                        <small>
                            Existing User? <strong><Link
                                className = "inintoku-color-blue"
                                to = {{
                                    pathname: "/login/"
                                }} >Sign In</Link></strong>
                        </small>
                    </div>
                </div>
            </div>
		);
	}
}
