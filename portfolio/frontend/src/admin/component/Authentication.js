import React, { Component } from 'react';
import { Form, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CSRFToken from './CSRFToken';

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            form_fields: props.form_fields,
            username: "",
            password: "",
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
        const { form_type, form_fields } = this.state;

		return (
            <div className="inintoku-login-container container">
                <div className="inintoku-login-image-container">
                    <Image className="inintoku-login-image" src="/static/inintoku/img/login.jpg" fluid />
                </div>

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
                                        onChange={ this.handleChange } />
                                </Form.Group>
                            )
                        })
                    }
                    <Button
                        type="submit"
                        variant="outline-info" >
                        Login
                    </Button>
                </Form>
            </div>
		);
	}
}

export default Authentication;
