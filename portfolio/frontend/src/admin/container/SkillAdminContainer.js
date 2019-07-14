import React, { Component } from 'react';
import SkillAdmin from '../component/SkillAdmin.js';

class SkillAdminContainer extends Component {
    constructor(props) {
        super(props);
        this.is_cancelled = false
        this.state = {
            skill_list: [],
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
        fetch('/api/skill-list/', {
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
                    skill_list: json,
                })
            }
        })
        .catch((error) => {
            console.error("Something went wrong.")
        });
    }

    render() {
        const { skill_list } = this.state;
        return (
            <SkillAdmin 
                skill_list={ skill_list } />
        )
    }
}

export default SkillAdminContainer;
