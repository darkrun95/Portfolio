import React, { Component } from 'react';
import Authentication from '../component/Authentication';

class AuthenticationContainer extends Component {
    constructor(props) {
        super(props);
        /*this.handleErrors = this.handleErrors.bind(this);*/
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
            /*alert_flag: false,
            alert_message: "",
            alert_variant: "info",*/
            form_fields: form_fields,
        }
    }

    /*handleErrors(response) {
        if (!response.ok) {
            this.setState({            
                alert_flag: true,
                alert_message: "Oops wrong username or password. Please try again.",
                alert_variant: "danger",
            })
            throw Error(response.statusText)
        }
        return response
    }*/

    handleAuthentication(data) {
        const login_data = {
            username: data["username"],
            password: data["password"],
        }

        /*fetch('/api/token-auth/', {
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
        });*/
    }

    render() {
        const { form_fields } = this.state;

        return (
            <Authentication
                handleAuthenticationCallback={ this.handleAuthentication }
                form_fields={ form_fields } />
        )
    }
}

export default AuthenticationContainer;
