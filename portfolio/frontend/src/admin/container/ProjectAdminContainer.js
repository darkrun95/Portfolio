import React, { Component } from 'react';
import ProjectAdmin from '../component/ProjectAdmin.js';

class ProjectAdminContainer extends Component {
    constructor(props) {
        super(props);
        this.is_cancelled = false
        this.state = {
            project_list: [],
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
        fetch('/api/project-list/', {
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
                    project_list: json,
                })
            }
        })
        .catch((error) => {
            console.error("Something went wrong.")
        });
    }

    render() {
        const { project_list } = this.state;
        return (
            <ProjectAdmin 
                project_list={ project_list } />
        )
    }
}

export default ProjectAdminContainer;
