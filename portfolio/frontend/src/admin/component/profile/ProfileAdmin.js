import React, { Component } from 'react';
import { 
    Form, Button, Image, Col, Row
} from 'react-bootstrap';
import { _ } from 'underscore';

class ProfileAdmin extends Component {
    constructor(props) {
        super(props);
        this.initiateFormUpdate = this.initiateFormUpdate.bind(this);

        this.state = {
            profile: props.profile,
        }
    }

    initiateFormUpdate() {
        const { initiateFormUpdateCallback } = this.props;
        initiateFormUpdateCallback("admin-profile");
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                profile: this.props.profile,
            })
        }
    }

    render() {
        const { profile } = this.state;
        return (
            <div>
                <Form> 
                    <h6>Profile Image</h6>
                    <div>
                        <Row>
                            <Col lg={3} md={5} xs={5}>
                                <Image className="inintoku-sidebar-image" 
                                           src={"/" + profile.profile_image}
                                           fluid
                                           roundedCircle
                                           thumbnail />
                            </Col>
                        </Row>
                    </div>

                    <div className="inintoku-vertical-space"></div>
                    <h6>Personal Details</h6>
                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Col sm={2} md={3} lg={3}>
                            <strong>Name:</strong>
                        </Col>
                        <Col sm={10} md={9} lg={9}>
                            <p>{ profile.first_name } { profile.last_name }</p>
                        </Col>

                        <Col sm={2} md={3} lg={3}>
                            <strong>Email:</strong>
                        </Col>
                        <Col sm={10} md={9} lg={9}>
                            <p>{ profile.email }</p>
                        </Col>

                        <Col sm={2} md={3} lg={3}>
                            <strong>Description: </strong>
                        </Col>
                        <Col sm={10} md={9} lg={9}>
                            <p>{ profile.description }</p>
                        </Col>
                    </Form.Group>

                    <div className="inintoku-vertical-space"></div>
                    <h6>Socials</h6>
                    <Form.Group as={Row} controlId="formHorizontalSocial">
                        <Col sm={2} md={3} lg={3}>
                            <strong>Github Link: </strong>
                        </Col>
                        <Col sm={10} md={9} lg={9}>
                            <p>{ profile.github_link }</p>
                        </Col>
                        
                        <Col sm={2} md={3} lg={3}>
                            <strong>LinkedIn Link: </strong>
                        </Col>
                        <Col sm={10} md={9} lg={9}>
                            <p>{ profile.linkedin_link }</p>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10 }}>
                            <Button 
                                onClick={ this.initiateFormUpdate }
                                variant="outline-warning">Update Details</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default ProfileAdmin;