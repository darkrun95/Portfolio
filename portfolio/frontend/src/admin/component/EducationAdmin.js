import React, { Component } from 'react';
import { 
    Card, 
    Button, 
    Image,
    Col, Row
} from 'react-bootstrap';
import { _ } from 'underscore';

class EducationAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            education_list: props.education_list,
        }
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                education_list: this.props.education_list,
            })
        }
    }

    render() {
        const { education_list } = this.state;
        return (
            <div>
                <Row>
                    {
                        education_list.map((item, index) => {
                            return (
                                <Col lg={4} md={6} sm={12} xs={12} key={`${index}`}>
                                    <Card className="inintoku-admin-entry-card">
                                        <Card.Body>
                                            <Card.Subtitle className="mb-2">
                                                { item.college_name }<br/> <small>{ item.course }</small>
                                            </Card.Subtitle>
                                            <Button 
                                                variant="outline-warning">Edit</Button> &nbsp;
                                            <Button 
                                                variant="outline-danger">Delete</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                    <Col lg={4} md={6} sm={12} xs={12} className="inintoku-vertical-center">
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    <Button variant="outline-success"><span>&#43;</span> Add</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EducationAdmin;