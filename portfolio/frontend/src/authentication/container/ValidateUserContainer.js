import React, { Component } from 'react';
import { ValidateUser } from '../component/ValidateUser';
import { Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

class ValidateUserContainer extends Component {
    constructor(props) {
        super(props);
        this.handleErrors = this.handleErrors.bind(this);
        this.getCookie = this.getCookie.bind(this);

        this.state = {
            expire_flag: false,
            username: undefined,
        }
    }

    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    handleErrors(response) {
        if (response.status != 200) {
            this.setState({
                expire_flag: true,
            })
            throw Error(response.statusText)
        }
        return response
    }

    componentDidMount() {
        const validateuser_data = {
            id: this.props.match.params.userid,
            validationtoken: this.props.match.params.validationtoken,
            csrftoken: this.getCookie("csrftoken"),
        }

        fetch('/api/validate-user/', {
                method: 'POST',
                credentials: 'include',
                mode: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': validateuser_data["csrftoken"]
                },
            body: JSON.stringify(validateuser_data)
        })
        .then(this.handleErrors)
        .then(response => response.json())
        .then(json => {
            this.setState({
                username: json.username,
            })
        })
        .catch((error) => {
            console.error("Session expired.")
        });
    }

    render() {
        const { expire_flag, username } = this.state;

        return (
            <div>
                <ValidateUser 
                    expire_flag = { expire_flag }
                    username = { username } />
            </div>
        )
    }
}

export default ValidateUserContainer;
