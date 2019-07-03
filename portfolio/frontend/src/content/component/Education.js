import React, { Component } from 'react';
import { 
	Container, 
	Col, 
	Row, 
	Image,
    Button 
} from 'react-bootstrap';

class Education extends Component {
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
                                        <strong>Monash University</strong><br/>
                                        <span className="inintoku-university-year">( 2018 - 2020 )</span>
                                    </p>
                                    <p className="inintoku-university-course">
                                        <span>Masters of Data Science</span>
                                    </p>
                                    <span className="inintoku-university-description">
                                        <ul>
                                            <li>GPA: 3.5, WAM: 80</li>
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

export default Education;