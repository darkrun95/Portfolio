import React, { Component } from 'react';
import Project from '../component/Project.js';

class ProjectContainer extends Component {
	constructor(props) {
		super(props);
		this.handleButton = this.handleButton.bind(this);
		this.handleProject = this.handleProject.bind(this);
	}

	handleButton() {
		this.props.history.push('/')
	}

	handleProject(project_link) {
	    window.location.href = project_link;
	}

    render() {
        return (
            <div>
                <Project handleButtonCallback={ this.handleButton }
                		 handleProjectCallback={ this.handleProject } />
            </div>
        );
    }
}

export default ProjectContainer;
