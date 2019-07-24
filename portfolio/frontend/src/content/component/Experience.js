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
import RichTextEditor from '../../utils/RichTextEditor.js';

class Experience extends Component {
    constructor(props) {
        super(props);
        this.handlePushBack = this.handlePushBack.bind(this);
        this.state = {
            experience_list: props.experience_list,
        }
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                experience_list: this.props.experience_list,
            })
        }
    }

    handlePushBack() {
        const { handleButtonCallback } = this.props;
        handleButtonCallback();
    }

    render() {
        const { experience_list } = this.state;

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
                                experience_list.map((item, index) => {
                                    return (
                                        <div className="inintoku-list-item" key={`${index}`}>
                                            <div className="inintoku-university-listing">
                                                <p className="inintoku-university-name">
                                                    <strong>{ item.company_name }</strong><br/>
                                                    <span className="inintoku-university-year">( { item.duration } )</span>
                                                </p>
                                                <p className="inintoku-university-course">
                                                    <span>{ item.role }</span>
                                                </p>
                                                <span className="inintoku-university-description">
                                                    <ul>
                                                        <li>
                                                            URL: &nbsp;
                                                            <a href="{ item.url }">
                                                                <strong>{ item.display_url }</strong>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <RichTextEditor content={ JSON.parse(item.description) } />
                                                </span>
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

export default Experience;