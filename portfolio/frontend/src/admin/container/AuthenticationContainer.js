import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Authentication from '../component/Authentication';
import Alert from 'react-bootstrap/Alert';

class AuthenticationContainer extends Component {
    constructor(props) {
        super(props);
        const tokenid = localStorage.getItem('tokenid');
        if (tokenid !== "null") {
            fetch('/api/check-authenticated/'+tokenid+'/',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(json => {
                props.history.push('/adminportfolio/')
            })
            .catch((error) => {
                props.history.push('/manage/')
            })
        }

        this.handleErrors = this.handleErrors.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.renderAlert = this.renderAlert.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);

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
            form_fields: form_fields,
        }
    }

    handleErrors(response) {
        if (!response.ok) {
            this.setState({            
                alert_flag: true,
                alert_message: "Oops wrong username or password.",
                alert_variant: "danger",
            })
            throw Error(response.statusText)
        }
        return response
    }

    renderRedirect() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/adminportfolio/" />
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

    handleAuthentication(data) {
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
            const login_credentials = {
                username: data['username'],
                access_token: json['token']['access_token'],
                expires_in: json['token']['expires_in'],
                token_type: json['token']['token_type'],
                refresh_token: json['token']['refresh_token']
            }

            fetch('/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login_credentials)
            })
            .then(this.handleErrors)
            .then(response => response.json())
            .then(json => {
                localStorage.setItem('tokenid', json['access_token'])
                this.setState({
                    redirect: true,
                })
            })
            .catch((error) => {
                console.error("Login operation failed.")
            });
        })
        .catch((error) => {
            console.error("Oops wrong username or password. Please try again.")
        });
    }

    render() {
        const { redirect, form_fields, alert_flag } = this.state;

        return (
            <div>
            {
                alert_flag ? this.renderAlert() : ""
            }
            {
                redirect ? this.renderRedirect() :
                <Authentication
                    handleAuthenticationCallback={ this.handleAuthentication }
                    form_fields={ form_fields } />
            }
            </div>
        )
    }
}

export default AuthenticationContainer;
