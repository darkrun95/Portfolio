import React, { Component } from 'react';
import { 
	Container, 
	Col, 
	Row, 
	Image,
    Link,
    Button 
} from 'react-bootstrap';
import { _ } from 'underscore';

class Project extends Component {
    constructor(props) {
        super(props);
        this.handlePushBack = this.handlePushBack.bind(this);
        this.handleProjectLink = this.handleProjectLink.bind(this);

        this.state = {
            project_list: props.project_list,
        }
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                project_list: this.props.project_list,
            })
        }
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
        const { project_list } = this.state;

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
                            {
                                project_list.map((item, index) => {
                                    return (
                                        <div className="inintoku-list-item" key={`${index}`}>
                                            <div className="inintoku-icon-section">
                                                <hr />
                                            </div>
                                            <div className="inintoku-university-listing">
                                                <p className="inintoku-university-name">
                                                    <strong>
                                                    	{ item.project_name }
                                                    </strong><br/>
                                                    <span className="inintoku-university-year">( { item.duration } )</span>
                                                </p>
                                                <p className="inintoku-university-course">
                                                    <span>
                                                    	<Button variant="outline-primary"
                                                    			className="inintoku-custom-button"
            				                                    onClick={ 
            				                                    	() => this.handleProjectLink(item.project_link)
            				                                    }>
            				                                Project Link
            				                            </Button>
                                                    </span>
                                                </p>
                                                <span className="inintoku-university-description">
                                                	Project Description:
                                                    <ul>
                                                        <li>{ item.description }</li>
                                                    </ul>
                                                </span>
                                                <p className="inintoku-tags">
        			                                { 
                                                        item.skills.map((skill, i) => {
                                                            return (
                                                                <span key={`${i}`}>
                                                                    <Button variant="outline-secondary">
                                                                        { skill } 
                                                                    </Button><span>&nbsp;</span>
                                                                </span>
                                                            )
                                                        })
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Project;