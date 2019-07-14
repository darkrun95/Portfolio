import React, { Component } from 'react';
import { _ } from 'underscore';

import { Card, Button, Col, Row } from 'react-bootstrap';

import ProfileAdminContainer from '../../container/ProfileAdminContainer.js';
import ExperienceAdminContainer from '../../container/ExperienceAdminContainer.js';
import EducationAdminContainer from '../../container/EducationAdminContainer.js';
import ProjectAdminContainer from '../../container/ProjectAdminContainer.js';
import SkillAdminContainer from '../../container/SkillAdminContainer.js';
import VolunteeringAdminContainer from '../../container/VolunteeringAdminContainer.js';

class Body extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedPanel: props.selectedPanel
		}

		this.renderContainer = this.renderContainer.bind(this);
	}

	componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                selectedPanel: this.props.selectedPanel,
            })
        }
    }

    renderContainer(selectedPanel) {
    	switch (selectedPanel) {
    		case 'profile':
    			return (
    				<ProfileAdminContainer />
    			)
    		case 'experience':
    			return (
    				<ExperienceAdminContainer />
    			)
    		case 'qualifications':
    			return (
    				<EducationAdminContainer />
    			)
    		case 'projects':
    			return (
    				<ProjectAdminContainer />
    			)
    		case 'skills':
    			return (
    				<SkillAdminContainer />
    			)
    		case 'volunteering':
    			return (
    				<VolunteeringAdminContainer />
    			) 
    		default:
    			return (
    				<ProfileAdminContainer />
    			)   			
    	}
    }

	render() {
		const { selectedPanel } = this.state;
		return (
			<div className="inintoku-admin-body">
			{
				this.renderContainer(selectedPanel)
			}
			</div>
		)
	}
}

export default Body;