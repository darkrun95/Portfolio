import React, { Component } from 'react';
import { ResetPassword } from '../component/ResetPassword';
import { Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

class ResetPasswordContainer extends Component {
    constructor(props) {
        super(props);
        this.handleErrors = this.handleErrors.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.validateData = this.validateData.bind(this);
        this.renderAlert = this.renderAlert.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);

        const form_type = "RESETPASSWORD";
        const form_fields = [
            {
                "control_id": "formGroupPassword",
                "display_name": "New Password:",
                "name": "password",
                "type": "password",
                "placeholder": "Enter new password",
            },
            {
                "control_id": "formGroupConfirmPassword",
                "display_name": "Confirm New Password",
                "name": "confirm_password",
                "type": "password",
                "placeholder": "Confirm Password"
            },
        ];

        this.state = {
            redirect: false,
            form_type: form_type,
            form_fields: form_fields,
            alert_flag: false,
            alert_message: "",
            alert_variant: "info",
            validation_flag: true,
            messages: {},
        }
    }

    validateData(data) {
        let messages = {
            "username": [],
            "password": [],
            "first_name": [],
            "last_name": [],
            "email": [],
            "confirm_password": [],
        };

        let validation_flag = true;
        const numerical_pattern = new RegExp("[0-9]+");
        const string_pattern = new RegExp("([a-z]+|[A-Z]+)");

        /* Password Validation */
        const { password, confirm_password } = data;
        
        if (password.length < 8) {
            messages["password"].push("Password too short");
            validation_flag = false;
        }

        if (!numerical_pattern.test(password) || !string_pattern.test(password)) {
            messages["password"].push("Password criteria not satisfied");
            validation_flag = false;
        }

        if (password !== confirm_password) {
            messages["confirm_password"].push("Passwords do not match");
            validation_flag = false;
        } 
        /* End Password Validation */

        const validation_res = {
            "messages": messages,
            "validation_flag": validation_flag,
        }

        return validation_res;
    }

    handleErrors(response) {
        if (response.status != 201) {
            this.setState({            
                alert_flag: true,
                alert_message: "Session Expired.",
                alert_variant: "danger",
            })
            throw Error(response.statusText)
        }
        return response
    }

    handleResetPassword(data) {
        const resetpassword_data = {
            id: this.props.match.params.userid,
            reset_token: this.props.match.params.resettoken,
            password: data["password"],
        }

        const { validation_flag, messages } = this.validateData(data);

        if (validation_flag) {
            fetch('/api/reset-password/', {
                    method: 'POST',
                    credentials: 'include',
                    mode: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRFToken': data["csrftoken"]
                    },
                body: JSON.stringify(resetpassword_data)
            })
            .then(this.handleErrors)
            .then(response => response.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    redirect: true,
                })
            })
            .catch((error) => {
                console.error("Session expired.")
            });
        } else {
            this.setState({
                validation_flag: validation_flag,
                messages: messages,
            })
            console.error("Oops! Some of your details are not passing our tests. Please try again.")
        }
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
        const { redirect, form_type, form_fields, validation_flag, messages, alert_flag } = this.state;
        return (
            <div>
            {
                alert_flag ? this.renderAlert() : ""
            }
            {
                redirect ? this.renderRedirect() :
                <ResetPassword
                    handleResetPasswordCallback={ this.handleResetPassword }
                    form_type={ form_type }
                    form_fields={ form_fields } 
                    validation_flag={ validation_flag }
                    messages={ messages } />
            }
            </div>
        )
    }
}

export default ResetPasswordContainer;
