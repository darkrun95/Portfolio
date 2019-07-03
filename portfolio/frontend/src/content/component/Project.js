import React, { Component } from 'react';
import { 
	Container, 
	Col, 
	Row, 
	Image,
    Link,
    Button 
} from 'react-bootstrap';

class Project extends Component {
    constructor(props) {
        super(props);
        this.handlePushBack = this.handlePushBack.bind(this);
        this.handleProjectLink = this.handleProjectLink.bind(this);
    }

    handlePushBack() {
        const { handleButtonCallback } = this.props;
        handleButtonCallback();
    }

    handleProjectLink(project_link) {
    	const { handleProjectCallback } = this.props;
    	handleProjectCallback(project_link);
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
                                        	Detection of DDoS attack in Software Defined Network
                                        </strong><br/>
                                        <span className="inintoku-university-year">( June 2016 – May 2017 )</span>
                                    </p>
                                    <p className="inintoku-university-course">
                                        <span>
                                        	<Button variant="outline-primary"
                                        			className="inintoku-custom-button"
				                                    onClick={ 
				                                    	() => this.handleProjectLink("https://github.com/RollingThunder6/MidnightInventers")
				                                    }>
				                                Project Link
				                            </Button>
                                        </span>
                                    </p>
                                    <span className="inintoku-university-description">
                                    	Project Description:
                                        <ul>
                                            <li>Lorem Ipsum</li>
                                        </ul>
                                    </span>
                                    <p className="inintoku-tags">
                                    	<Button variant="outline-secondary">
			                                Python
			                            </Button>
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Project;