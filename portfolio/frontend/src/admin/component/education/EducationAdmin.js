import React, { Component } from 'react';
import { 
    Card, 
    Button,  
    Accordion,
    Col, 
    Row
} from 'react-bootstrap';
import RichTextEditor from '../../../utils/RichTextEditor';
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
                    <Col lg={12} md={12} sm={12} xs={12} className="inintoku-vertical-space">
                        <Accordion>
                        {
                            education_list.map((item, index) => {
                                return (
                                    <Card key={`${index}`} className="inintoku-accordion-class">
                                        <Accordion.Toggle as={ Card.Header } eventKey={`${index}`}>
                                            <h6>{ item.college_name }</h6><span>{ item.course }</span>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey={`${index}`}>
                                            <Card.Body>
                                                <RichTextEditor content={ JSON.parse(item.description) } />
                                                
                                                <div className="inintoku-accordion-button">
                                                    <Button 
                                                        onClick={ (event)=>{ this.initiateFormUpdate(event.target.value) } }
                                                        value={ item.id }
                                                        variant="outline-warning">Edit</Button> &nbsp;
                                                    <Button 
                                                        onClick={ (event)=>{ this.deleteEducation(event.target.value) } }
                                                        value={ item.id }
                                                        variant="outline-danger">Delete</Button>
                                                </div>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                )
                            })
                        }
                        </Accordion>
                    </Col>

                    <Col lg={4} md={4} sm={6} xs={6} className="inintoku-vertical-center">
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