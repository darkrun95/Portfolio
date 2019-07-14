import React, { Component } from 'react';
import { 
    Form, Button, Image, Col, Row
} from 'react-bootstrap';
import { _ } from 'underscore';

class ProfileAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: props.profile,
        }
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
                            <Col lg={3}>
                                <Image className="inintoku-sidebar-image" 
                                           src="/static/inintoku/img/face.jpg" 
                                           fluid
                                           roundedCircle
                                           thumbnail />
                            </Col>
                        </Row>
                    </div>

                    <div className="inintoku-vertical-space"></div>
                    <h6>Personal Details</h6>
                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Col sm={2}>
                            <strong>Name:</strong>
                        </Col>
                        <Col sm={10}>
                            <p>{ profile.first_name } { profile.last_name }</p>
                        </Col>

                        <Col sm={2}>
                            <strong>Email:</strong>
                        </Col>
                        <Col sm={10}>
                            <p>{ profile.email }</p>
                        </Col>

                        <Col sm={2}>
                            <strong>Description: </strong>
                        </Col>
                        <Col sm={10}>
                            <p>{ profile.description }</p>
                        </Col>
                    </Form.Group>

                    <div className="inintoku-vertical-space"></div>
                    <h6>Socials</h6>
                    <Form.Group as={Row} controlId="formHorizontalSocial">
                        <Col sm={2}>
                            <strong>Github Link: </strong>
                        </Col>
                        <Col sm={10}>
                            <p>{ profile.github_link }</p>
                        </Col>
                        
                        <Col sm={2}>
                            <strong>LinkedIn Link: </strong>
                        </Col>
                        <Col sm={10}>
                            <p>{ profile.linkedin_link }</p>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10 }}>
                            <Button 
                                variant="outline-warning">Update Details</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default ProfileAdmin;