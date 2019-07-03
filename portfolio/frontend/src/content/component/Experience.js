import React, { Component } from 'react';
import { 
	Container, 
	Col, 
	Row, 
	Image,
    Link,
    Button 
} from 'react-bootstrap';

class Experience extends Component {
    constructor(props) {
        super(props);
        this.handlePushBack = this.handlePushBack.bind(this);
    }

    handlePushBack() {
        const { handleButtonCallback } = this.props;
        handleButtonCallback();
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
                                        <strong>Procmart</strong><br/>
                                        <span className="inintoku-university-year">( June 2017 - Dec. 2017 )</span>
                                    </p>
                                    <p className="inintoku-university-course">
                                        <span>Junior Full Stack Developer</span>
                                    </p>
                                    <span className="inintoku-university-description">
                                        <ul>
                                            <li>Lorem Ipsum</li>
                                        </ul>
                                    </span>
                                </div>
                                <div className="inintoku-university-logo">
                                    <Image src="/static/inintoku/img/procmart-logo.png" 
                                           className="inintoku-logo-image"
                                           rounded 
                                           thumbnail />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Experience;