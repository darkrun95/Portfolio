import React, { Component } from 'react';
import { Login } from '../component/Login';
import { Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.handleErrors = this.handleErrors.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.renderAlert = this.renderAlert.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);

        const form_type = "LOGIN";
        const form_fields = [
            {
                "control_id": "formGroupUsername",
                "display_name": "Username",
                "name": "username",
                "type": "text",
                "placeholder": "Enter Username",
            },
            {
                "control_id": "formGroupPassword",
                "display_name": "Password",
                "name": "password",
                "type": "password",
                "placeholder": "Password"
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
        if (!response.ok) {
            this.setState({            
                alert_flag: true,
                alert_message: "Oops wrong username or password. Please try again.",
                alert_variant: "danger",
            })
            throw Error(response.statusText)
        }
        return response
    }

    handleLogin(data) {
        const login_data = {
            username: data["username"],
            password: data["password"],
        }

        fetch('/api/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login_data)
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
            console.error("Oops wrong username or password. Please try again.")
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
        const { 
            redirect, 
            form_type, 
            form_fields,
            alert_flag,
        } = this.state;

        return (
            <div>
            {
                alert_flag ? this.renderAlert() : ""
            }
            {
                redirect ? this.renderRedirect() :
                <Login
                    handleLoginCallback={ this.handleLogin }
                    form_type={ form_type }
                    form_fields={ form_fields } />
            }
            </div>
        )
    }
}

export default LoginContainer;
