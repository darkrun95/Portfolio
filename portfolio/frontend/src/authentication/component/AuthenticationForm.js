import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { CSRFToken } from './CSRFToken';
import { _ } from 'underscore';

class AuthenticationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form_type: props.form_type,
            form_fields: props.form_fields,
            validation_flag: props.validation_flag === undefined ? true : props.validation_flag,
            messages: props.messages === undefined ? {} : props.messages,
            username: "",
            password: "",
            email: "",
            first_name: "",
            last_name: "",
            csrftoken: "",
            confirm_password: "",
        }

        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                validation_flag: this.props.validation_flag,
                messages: this.props.messages
            })
        }
    }

    submitForm() {
        event.preventDefault();
        const { handleAuthenticationCallback } = this.props;
        this.setState({
            csrftoken: event.target.children[0].value,
        }, () => {
            const data = this.state;
            handleAuthenticationCallback(data);
        })
    }

    handleChange() {
        if (event.target.name in this.state) {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
    }

	render() {
        const { form_type, form_fields, validation_flag, messages } = this.state;

		return (
            <Form method="POST" onSubmit={ this.submitForm }>
                <CSRFToken />
                {
                    form_fields.map((field, key) => {
                        return (
                            <Form.Group className="inintoku-form" controlId={field['control_id']} key={`form-fields-key ${key}`}>
                                <Form.Label>{field['display_name']}</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type={field['type']}
                                    name={field['name']}
                                    placeholder={field['placeholder']}
                                    isInvalid={ 
                                        (
                                            messages[field['name']] !== undefined && 
                                            messages[field['name']].length > 0
                                        ) 
                                    }
                                    onChange={ this.handleChange } />
                                <Form.Control.Feedback type="invalid">
                                    <ul>
                                    { 
                                        messages[field['name']] !== undefined ?
                                        messages[field['name']].map((message, message_key) => {
                                            return (
                                                <li key={`messages-key ${message_key}`}>{ message }</li>
                                            )
                                        }) : ""
                                    }
                                    </ul>
                                </Form.Control.Feedback>
                            </Form.Group>
                        )
                    })
                }
                <Button
                    type="submit"
                    variant="outline-info" >
                    {
                        form_type == "SIGNUP" ? "Sign Up" : 
                        form_type == "FORGOTPASSWORD" ? "Reset Password" : "Submit"
                    }
                </Button>
            </Form>
		);
	}
}

export default AuthenticationForm;
