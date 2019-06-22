import React, { Component } from 'react';
import { Form, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthenticationFormContainer } from '../container/AuthenticationFormContainer';
import { _ } from 'underscore';

export class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.resetPasswordSubmit = this.resetPasswordSubmit.bind(this);

        this.state = {
            form_type: props.form_type,
            form_fields: props.form_fields,
            validation_flag: props.validation_flag,
            messages: props.messages,
        }
    }

    resetPasswordSubmit(data) {
        const { handleResetPasswordCallback } = this.props;
        handleResetPasswordCallback(data);
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
                    genericFormCallback = { this.resetPasswordSubmit } />
            </div>
        );
    }
}
