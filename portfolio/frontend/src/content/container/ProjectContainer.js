import React, { Component } from 'react';
import Project from '../component/Project.js';

class ProjectContainer extends Component {
	constructor(props) {
		super(props);
		this.handleButton = this.handleButton.bind(this);
		this.handleProject = this.handleProject.bind(this);
		this.handleErrors = this.handleErrors.bind(this);

        this.state = {
            project_list: [],
        }
	}

	handleButton() {
		this.props.history.push('/')
	}

	handleProject(project_link) {
        window.open(project_link, '_blank');
	}

	handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response
    }

    componentDidMount() {
        fetch('/api/project-list/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(this.handleErrors)
        .then(response => response.json())
        .then(json => {
            this.setState({
                project_list: json,
            })
        })
        .catch((error) => {
            this.setState({
                project_list: [],
            })
            console.error("Something went wrong.")
        });
    }

    render() {
    	const { project_list } = this.state;
        return (
            <div>
                <Project handleButtonCallback={ this.handleButton }
                		 handleProjectCallback={ this.handleProject }
                		 project_list={ project_list } />
            </div>
        );
    }
}

export default ProjectContainer;
