import React, { Component } from 'react';
import Education from '../component/Education.js';

class EducationContainer extends Component {
	constructor(props) {
		super(props);
		this.handleButton = this.handleButton.bind(this);
	}

	handleButton() {
		this.props.history.push('/')
	}

    render() {
        return (
            <div>
                <Education handleButtonCallback={ this.handleButton } />
            </div>
        );
    }
}

export default EducationContainer;
