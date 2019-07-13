import React, { Component } from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import ExperienceAdminContainer from '../../container/ExperienceAdminContainer.js';

class Body extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="inintoku-admin-body">
				<ExperienceAdminContainer />
			</div>
		)
	}
}

export default Body;