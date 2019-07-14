import React, { Component } from 'react';
import Experience from '../component/Experience.js';

class ExperienceContainer extends Component {
	constructor(props) {
		super(props);
		this.handleButton = this.handleButton.bind(this);
		this.handleErrors = this.handleErrors.bind(this);

        this.state = {
            experience_list: [],
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
        fetch('/api/experience-list/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
            <div>
                <Experience 
                	handleButtonCallback={ this.handleButton } 
                	experience_list={ experience_list } />
            </div>
        );
    }
}

export default ExperienceContainer;
