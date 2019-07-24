import React, { Component } from 'react';
import Education from '../component/Education.js';

class EducationContainer extends Component {
	constructor(props) {
		super(props);
		this.handleButton = this.handleButton.bind(this);
		this.handleErrors = this.handleErrors.bind(this);

		this.state = {
            education_list: [],
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
        fetch('/api/education-list/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(this.handleErrors)
        .then(response => response.json())
        .then(json => {
            this.setState({
                education_list: json,
            })
        })
        .catch((error) => {
            this.setState({
                education_list: [],
            })
            console.error("Something went wrong.")
        });
    }

    render() {
    	const { education_list } = this.state;

        return (
            <div>
                <Education 
                	handleButtonCallback={ this.handleButton } 
                	education_list={ education_list } />
            </div>
        );
    }
}

export default EducationContainer;
