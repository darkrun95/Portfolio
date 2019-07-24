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
        initiateFormUpdateCallback("update-profile");
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
                {
                    profile === undefined ? "" :
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
                            <Form.Label column sm={2} md={3} lg={3}>
                                <strong>Name:</strong>
                            </Form.Label>
                            <Col sm={10} md={9} lg={9}>
                                <Row>
                                    <Col sm={6} md={6} lg={6}>
                                        <Form.Control placeholder={ profile.first_name } disabled />
                                    </Col>
                                    <Col sm={6} md={6} lg={6}>
                                        <Form.Control placeholder={ profile.last_name } disabled />
                                    </Col>
                                </Row>
                            </Col>

                            <Form.Label column sm={2} md={3} lg={3}>
                                <strong>Email:</strong>
                            </Form.Label>
                            <Col sm={10} md={9} lg={9}>
                                <Form.Control placeholder={ profile.email } disabled />
                            </Col>

                            <Form.Label column sm={2} md={3} lg={3}>
                                <strong>Description:</strong>
                            </Form.Label>
                            <Col sm={10} md={9} lg={9}>
                                <Form.Control placeholder={ profile.description } disabled />
                            </Col>
                        </Form.Group>

                        <div className="inintoku-vertical-space"></div>
                        <h6>Socials</h6>
                        <Form.Group as={Row} controlId="formHorizontalSocial">
                            <Form.Label column sm={2} md={3} lg={3}>
                                <strong>Github Link:</strong>
                            </Form.Label>
                            <Col sm={10} md={9} lg={9}>
                                <Form.Control placeholder={ profile.github_link } disabled />
                            </Col>
                            
                            <Form.Label column sm={2} md={3} lg={3}>
                                <strong>Linkedin Link:</strong>
                            </Form.Label>
                            <Col sm={10} md={9} lg={9}>
                                <Form.Control placeholder={ profile.linkedin_link } disabled />
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
                }
            </div>
        );
    }
}

export default ProfileAdmin;