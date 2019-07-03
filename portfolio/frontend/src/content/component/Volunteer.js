import React, { Component } from 'react';
import { 
    Container, 
    Col, 
    Row, 
    Image,
    Link,
    Button 
} from 'react-bootstrap';

class Volunteer extends Component {
    constructor(props) {
        super(props);
        this.handlePushBack = this.handlePushBack.bind(this);
        this.handleVolunteerLink = this.handleVolunteerLink.bind(this);
    }

    handlePushBack() {
        const { handleButtonCallback } = this.props;
        handleButtonCallback();
    }

    handleVolunteerLink(volunteer_link) {
        const { handleVolunteerCallback } = this.props;
        handleVolunteerCallback(volunteer_link);
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className="inintoku-education-row">
                        <Col lg={1} md={1} sm={1} xs={1}></Col>
                        <Col lg={10} md={10} sm={10} xs={10}>
                            <Button variant="outline-dark"
                                    onClick={ this.handlePushBack }>
                                &#8672; <strong>Back</strong>
                            </Button>
                        </Col>
                    </Row>
                    <Row className="inintoku-education-row">
                        <Col lg={1} md={1} sm={1} xs={1}></Col>
                        <Col lg={10} md={10} sm={10} xs={10}>
                            <div className="inintoku-list-item">
                                <div className="inintoku-icon-section">
                                    <hr />
                                </div>
                                <div className="inintoku-university-listing">
                                    <p className="inintoku-university-name">
                                        <strong>
                                            Accredited Student
                                        </strong><br/>
                                        <span className="inintoku-university-year">( Sep 2014 – Jan 2017 )</span>
                                    </p>
                                    <p className="inintoku-university-course">
                                        <span><h6>Computer Society of India</h6></span>
                                    </p>
                                    <span className="inintoku-university-description">
                                        <ul>
                                            <li>CSI accredited Student from PES Modern College of Engineering.</li>
                                        </ul>
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Volunteer;