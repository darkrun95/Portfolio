import React, { Component } from 'react';
import { SignUp } from '../component/SignUp';
import { Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

class SignUpContainer extends Component {
    constructor(props) {
        super(props);
        this.handleErrors = this.handleErrors.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.validateData = this.validateData.bind(this);
        this.renderAlert = this.renderAlert.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);

        const form_type = "SIGNUP";
        const form_fields = [
            {
                "control_id": "formGroupUsername",
                "display_name": "Username",
                "name": "username",
                "type": "text",
                "placeholder": "Enter Username",
            },
            {
                "control_id": "formGroupFirstName",
                "display_name": "First Name",
                "name": "first_name",
                "type": "text",
                "placeholder": "Enter First Name",
            },
            {
                "control_id": "formGroupLastName",
                "display_name": "Last Name",
                "name": "last_name",
                "type": "text",
                "placeholder": "Enter Last Name",
            },
            {
                "control_id": "formGroupEmail",
                "display_name": "Email",
                "name": "email",
                "type": "text",
                "placeholder": "Enter Email",
            },
            {
                "control_id": "formGroupPassword",
                "display_name": "Password",
                "name": "password",
                "type": "password",
                "placeholder": "Password"
            },
            {
                "control_id": "formGroupConfirmPassword",
                "display_name": "Confirm Password",
                "name": "confirm_password",
                "type": "password",
                "placeholder": "Confirm Password"
            }
        ];

        this.state = {
            redirect: false,
            form_type: form_type,
            form_fields: form_fields,
            validation_flag: true,
            messages: {},
            alert_flag: false,
            alert_message: "",
            alert_variant: "info",
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
        const email_pattern = new RegExp("^.+@[^\.].*\.[a-z]{2,}$");

        /* Username, First name, Last name validation */
        const { username, first_name, last_name } = data;

        if (username.length == 0) {
            messages["username"].push("Username cannot be empty");
            validation_flag = false;
        }

        if (first_name.length == 0) {
            messages["first_name"].push("First name cannot be empty");
            validation_flag = false;
        }

        if (numerical_pattern.test(first_name)) {
            messages["first_name"].push("Ooh! Numbers are not allowed in names.");
            validation_flag = false;
        }

        if (numerical_pattern.test(last_name)) {
            messages["last_name"].push("Ooh! Numbers are not allowed in names.");
            validation_flag = false;
        }
        /* Username, First name, Last name validation end */

        /* Email Validation */
        const { email } = data;

        if (email.length == 0) {
            messages["email"].push("Promise we won't spam you :)");
            validation_flag = false;
        }

        if (!email_pattern.test(email) && email.length > 0) {
            messages["email"].push("Hmm. Doesn't seem like a valid email id");
            validation_flag = false;
        }
        /* End Email validation */

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
        if (!response.ok) {
            this.setState({            
                alert_flag: true,
                alert_message: "Oops! Please try again.",
                alert_variant: "danger",
            })
            throw Error(response.statusText)
        }
        return response
    }

    handleSignUp(data) {
        const signup_data = {
            username: data["username"],
            email: data["email"],
            password: data["password"],
            first_name: data["first_name"],
            last_name: data["last_name"],
        }

        const { validation_flag, messages } = this.validateData(data);

        if (validation_flag) {
            fetch('/api/users/', {
                method: 'POST',
                credentials: 'include',
                mode: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': data["csrftoken"]
                },
                body: JSON.stringify(signup_data)
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
                console.error("Oops! Please try again.")
            });;
        } else {
            this.setState({
                validation_flag: validation_flag,
                messages: messages,
            })
            console.error("Oops! Some of your details are not passing our tests. Please try again.")
        }
    }

    renderRedirect() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/" />
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

    render() {
        const { redirect, form_type, form_fields, validation_flag, messages, alert_flag } = this.state;
        return (
            <div>
            {
                alert_flag ? this.renderAlert() : ""
            }
            {
                redirect ? this.renderRedirect() :
                <SignUp
                    handleSignUpCallback={ this.handleSignUp }
                    form_type={ form_type }
                    form_fields={ form_fields } 
                    validation_flag={ validation_flag }
                    messages={ messages } />
            }
            </div>
        )
    }
}

export default SignUpContainer;
