import React, { Component } from 'react';
import Volunteer from '../component/Volunteer.js';

class VolunteerContainer extends Component {
	constructor(props) {
		super(props);
		this.handleButton = this.handleButton.bind(this);
		this.handleErrors = this.handleErrors.bind(this);

		this.state = {
            volunteering_list: [],
        }
	}

	handleButton() {
		this.props.history.push('/')
	}

	handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response
    }

    componentDidMount() {
        fetch('/api/volunteer-list/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(this.handleErrors)
        .then(response => response.json())
        .then(json => {
            this.setState({
                volunteering_list: json,
            })
        })
        .catch((error) => {
            this.setState({
                volunteering_list: [],
            })
            console.error("Something went wrong.")
        });
    }

    render() {
    	const { volunteering_list } = this.state;

        return (
            <div>
                <Volunteer 
                	handleButtonCallback={ this.handleButton }
                	volunteering_list={ volunteering_list } />
            </div>
        );
    }
}

export default VolunteerContainer;
