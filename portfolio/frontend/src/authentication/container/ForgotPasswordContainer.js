import React, { Component } from 'react';
import { ForgotPassword } from '../component/ForgotPassword';
import { Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

class ForgotPasswordContainer extends Component {
    constructor(props) {
        super(props);
        this.handleErrors = this.handleErrors.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.renderAlert = this.renderAlert.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);

        const form_type = "FORGOTPASSWORD";
        const form_fields = [
            {
                "control_id": "formGroupEmail",
                "display_name": "Email:",
                "name": "email",
                "type": "text",
                "placeholder": "john.doe@example.com",
            }
        ];

        this.state = {
            redirect: false,
            alert_flag: false,
            alert_message: "",
            alert_variant: "info",
            form_type: form_type,
            form_fields: form_fields,
        }
    }

    handleErrors(response) {
        if (response.status != 200) {
            this.setState({            
                alert_flag: true,
                alert_message: "Email does not exist in our system. Try again.",
                alert_variant: "danger",
            })
            throw Error(response.statusText)
        }
        return response
    }

    handleForgotPassword(data) {
        const forgotpassword_data = {
            email: data["email"],
            reset_token: 0,
        }

        fetch('/api/forgot-password/', {
                method: 'POST',
                credentials: 'include',
                mode: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': data["csrftoken"]
                },
            body: JSON.stringify(forgotpassword_data)
        })
        .then(this.handleErrors)
        .then(response => response.json())
        .then(json => {
            this.setState({            
                alert_flag: true,
                alert_message: "An email has been sent to "+data["email"]+" with the reset link",
                alert_variant: "success",
            })
        })
        .catch((error) => {
            console.error("Username does not exist.")
        });
    }

    dismissAlert() {
        this.setState({
            alert_flag: false,
            alert_variant: "info",
            alert_message: "",
        })
    }

    renderAlert() {
        const { alert_flag, alert_message, alert_variant } = this.state;
        if (alert_flag) {
            return (
                <div>
                    <Alert dismissible variant={ alert_variant } onClose={ this.dismissAlert } >
                        { alert_message }
                    </Alert>
                </div>
            )
        }
    }

    renderRedirect() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/" />
        }
    }

    render() {
        const { redirect, form_type, form_fields, alert_flag } = this.state;
        return (
            <div>
            {
                alert_flag ? this.renderAlert() : ""
            }
            {
                redirect ? this.renderRedirect() :
                <ForgotPassword
                    handleForgotPasswordCallback={ this.handleForgotPassword }
                    form_type={ form_type }
                    form_fields={ form_fields } />
            }
            </div>
        )
    }
}

export default ForgotPasswordContainer;
