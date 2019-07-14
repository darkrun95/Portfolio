import React, { Component } from 'react';
import ProfileAdmin from '../component/ProfileAdmin.js';

class ProfileAdminContainer extends Component {
    constructor(props) {
        super(props);
        this.is_cancelled = false
        this.state = {
            profile: {},
        }

        this.handleErrors = this.handleErrors.bind(this);
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response
    }

    componentWillUnmount() {
        this.is_cancelled = true;
    }

    componentDidMount() {
        fetch('/api/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(this.handleErrors)
        .then(response => response.json())
        .then(json => {
            if (json && !this.is_cancelled) {
                this.setState({
                    profile: json,
                })
            }
        })
        .catch((error) => {
            console.error("Something went wrong.")
        });
    }

    render() {
        const { profile } = this.state;
        return (
            <ProfileAdmin 
                profile={ profile } />
        )
    }
}

export default ProfileAdminContainer;
