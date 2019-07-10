import React, { Component } from 'react';
import ExperienceAdmin from '../component/ExperienceAdmin.js';

class ExperienceAdminContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experience_list: [],
        }

        this.handleErrors = this.handleErrors.bind(this);
    }

    handleErrors(response) {
        if (!response.ok) {
            this.setState({            
                
            })
            throw Error(response.statusText)
        }
        return response
    }

    componentDidMount() {
        fetch('/api/experience-list/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(this.handleErrors)
        .then(response => response.json())
        .then(json => {
            this.setState({
                experience_list: json,
            })
        })
        .catch((error) => {
            this.setState({
                experience_list: [],
            })
            console.error("Something went wrong.")
        });
    }

    render() {
        const { experience_list } = this.state;
        return (
            <ExperienceAdmin 
                experience_list={ experience_list } />
        )
    }
}

export default ExperienceAdminContainer;
