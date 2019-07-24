import React, { Component } from 'react';
import { _ } from 'underscore';

import { Card, Button, Col, Row } from 'react-bootstrap';

import ProfileAdminContainer from '../../container/profile/ProfileAdminContainer';
import EducationAdminContainer from '../../container/education/EducationAdminContainer';
import ExperienceAdminContainer from '../../container/ExperienceAdminContainer';
import ProjectAdminContainer from '../../container/ProjectAdminContainer';
import SkillAdminContainer from '../../container/SkillAdminContainer';
import VolunteeringAdminContainer from '../../container/VolunteeringAdminContainer';

import ProfileUpdateContainer from '../../container/profile/ProfileUpdateContainer';
import EducationUpdateContainer from '../../container/education/EducationUpdateContainer';

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
            case 'update-profile':
                return (
                    <ProfileUpdateContainer />
                )
    		case 'experience':
    			return (
    				<ExperienceAdminContainer />
    			)
    		case 'qualifications':
    			return (
    				<EducationAdminContainer />
    			)
            case 'update-qualifications':
                return (
                    <EducationUpdateContainer />
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