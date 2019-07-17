import React, { Component } from 'react';
import { Form, Button, Image, Col, Row } from 'react-bootstrap';
import DropzoneComponent from '../../../utils/Dropzone.js';
import { _ } from 'underscore';

class ProfileUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	profile: props.profile,
        }

        this.initiateFormUpdate = this.initiateFormUpdate.bind(this);
        this.cancelFormUpdate = this.cancelFormUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                profile: this.props.profile,
            })
        }
    }

    initiateFormUpdate() {
    	const { profile } = this.state;
    	const { handleSubmitProfile } = this.props;
    	handleSubmitProfile(profile);
    }

    cancelFormUpdate() {
    	const { handleCancelUpdate } = this.props;
    	handleCancelUpdate()
    }

    handleChange(event) {
    	const { profile } = this.state;
    	profile[event.target.name] = event.target.value;
    	this.setState({
    		profile: profile,
    	})
    }

    render() {
    	const { profile } = this.state;
        return (
            <div>
            	{
            		profile === undefined ? "" :
            		profile.profile_image === undefined ? "" :
	                <Form> 
	                	<Row>
	                		<Col lg={3} md={5} xs={5}>
	                    		<h6>Profile Image</h6>
	                    	</Col>
	                    </Row>
	                    <div>
	                        <Row>
	                            <Col lg={3} md={5} xs={5}>
	                                <Image className="inintoku-sidebar-image" 
	                                           src={ "/" + profile.profile_image } 
	                                           fluid
	                                           roundedCircle
	                                           thumbnail />
	                            </Col>
	                            <Col lg={9} md={7} xs={7}>
									<DropzoneComponent />
	                            </Col>
	                        </Row>
	                    </div>

	                    <div className="inintoku-vertical-space"></div>
	                    <h6>Personal Details</h6>
	                    <Form.Group as={Row} controlId="formHorizontalName">
	                        <Form.Label column sm={2} md={3} lg={3}>
								<strong>Name:</strong>
							</Form.Label>
							<Col sm={10} md={9} lg={9}>
								<Row>
									<Col sm={6} md={6} lg={6}>
										<Form.Control name="first_name" type="text" value={ profile.first_name } onChange={ this.handleChange } />
									</Col>
									<Col sm={6} md={6} lg={6}>
										<Form.Control name="last_name" type="text" value={ profile.last_name } onChange={ this.handleChange } />
									</Col>
								</Row>
							</Col>
							
							<Form.Label column sm={2} md={3} lg={3}>
								<strong>Email:</strong>
							</Form.Label>
							<Col sm={10} md={9} lg={9}>
								<Form.Control name="email" type="email" value={ profile.email } onChange={ this.handleChange } />
							</Col>

	                        <Form.Label column sm={2} md={3} lg={3}>
								<strong>Description:</strong>
							</Form.Label>
							<Col sm={10} md={9} lg={9}>
								<Form.Control name="description" type="text" value={ profile.description } onChange={ this.handleChange } />
							</Col>
	                    </Form.Group>

	                    <div className="inintoku-vertical-space"></div>
	                    <h6>Socials</h6>
	                    <Form.Group as={Row} controlId="formHorizontalSocial">
	                        <Form.Label column sm={2} md={3} lg={3}>
								<strong>Github Link:</strong>
							</Form.Label>
							<Col sm={10} md={9} lg={9}>
								<Form.Control name="github_link" type="text" value={ profile.github_link } onChange={ this.handleChange } />
							</Col>
	                        
	                        <Form.Label column sm={2} md={3} lg={3}>
								<strong>Linkedin Link:</strong>
							</Form.Label>
							<Col sm={10} md={9} lg={9}>
								<Form.Control name="linkedin_link" type="text" value={ profile.linkedin_link } onChange={ this.handleChange } />
							</Col>
	                    </Form.Group>

	                    <Form.Group as={Row}>
	                        <Col sm={{ span: 10 }}>
	                            <Button 
	                                onClick={ this.initiateFormUpdate }
	                                variant="outline-success">Update</Button>
	                            &nbsp;
	                            <Button 
	                                onClick={ this.cancelFormUpdate }
	                                variant="outline-danger">Cancel</Button>
	                        </Col>
	                    </Form.Group>
	                </Form>
	            }
            </div>
        );
    }
}

export default ProfileUpdate;
