import React, { Component } from 'react';
import Experience from '../component/Experience.js';

class ExperienceContainer extends Component {
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
                <Experience handleButtonCallback={ this.handleButton } />
            </div>
        );
    }
}

export default ExperienceContainer;
