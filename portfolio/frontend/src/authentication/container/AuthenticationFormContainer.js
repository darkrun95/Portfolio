import React, { Component } from 'react';
import AuthenticationForm from '../component/AuthenticationForm';
import { _ } from 'underscore';

export class AuthenticationFormContainer extends Component {
    constructor(props) {
        super(props);

        this.authenticationFormCallback = this.authenticationFormCallback.bind(this);

        this.state = {
            form_type: props.form_type,
            form_fields: props.form_fields,
            validation_flag: props.validation_flag === undefined ? true : props.validation_flag,
            messages: props.messages === undefined ? {} : props.messages,
        }
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                validation_flag: this.props.validation_flag,
                messages: this.props.messages
            })
        }
    }

    authenticationFormCallback(data) {
        const { genericFormCallback } = this.props;
        genericFormCallback(data);
    }

    render() {
        const { form_type, form_fields, validation_flag, messages } = this.state;
        return (
            <AuthenticationForm
                form_type = { form_type }
                form_fields =  { form_fields }
                validation_flag = { validation_flag }
                messages = { messages }
                handleAuthenticationCallback = { this.authenticationFormCallback } />
        );
    }
}
