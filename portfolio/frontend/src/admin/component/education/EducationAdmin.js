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

        this.initiateFormUpdate = this.initiateFormUpdate.bind(this);
        this.deleteEducation = this.deleteEducation.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                education_list: this.props.education_list,
            })
        }
    }

    initiateFormUpdate(id = undefined) {
        const { initiateFormUpdateCallback } = this.props;
        if (id === undefined) {
            initiateFormUpdateCallback("update-qualifications");
        } else {
            initiateFormUpdateCallback("update-qualifications", id);
        }
    }

    deleteEducation(id) {
        const { handleDeleteEducation } = this.props;
        handleDeleteEducation(id)
    }

    render() {
        const { education_list } = this.state;
        return (
            <div>
                <Row>
                    {
                        education_list.map((item, index) => {
                            return (
                                <Col lg={12} md={12} sm={12} xs={12} key={`${index}`}>
                                    <Card className="inintoku-admin-entry-card">
                                        <Card.Body>
                                            <span className="inintoku-inline inintoku-listing-left">
                                                <Card.Subtitle className="mb-2">
                                                    { item.college_name }<br/> <small>{ item.course }</small>
                                                </Card.Subtitle>
                                            </span>
                                            <span className="inintoku-inline inintoku-listing-right">
                                                <Button 
                                                    onClick={ (event)=>{ this.initiateFormUpdate(event.target.value) } }
                                                    value={ item.id }
                                                    variant="outline-warning">Edit</Button> &nbsp;
                                                <Button 
                                                    onClick={ (event)=>{ this.deleteEducation(event.target.value) } }
                                                    value={ item.id }
                                                    variant="outline-danger">Delete</Button>
                                            </span>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                    <Col lg={4} md={4} sm={4} xs={4} className="inintoku-vertical-center">
                        <Button 
                            value = { undefined }
                            onClick={ (event)=>{ this.initiateFormUpdate(event.target.value) } }
                            variant="outline-success">
                            New Activity
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EducationAdmin;