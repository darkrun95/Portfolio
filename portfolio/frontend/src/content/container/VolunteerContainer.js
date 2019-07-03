import React, { Component } from 'react';
import Volunteer from '../component/Volunteer.js';

class VolunteerContainer extends Component {
	constructor(props) {
		super(props);
		this.handleButton = this.handleButton.bind(this);
		this.handleVolunteer = this.handleVolunteer.bind(this);
	}

	handleButton() {
		this.props.history.push('/')
	}

	handleVolunteer(volunteer_link) {
	    window.location.href = volunteer_link;
	}

    render() {
        return (
            <div>
                <Volunteer handleButtonCallback={ this.handleButton }
                		 handleVolunteerCallback={ this.handleVolunteer } />
            </div>
        );
    }
}

export default VolunteerContainer;
