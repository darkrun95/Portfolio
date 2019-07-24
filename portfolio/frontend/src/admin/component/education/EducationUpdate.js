import React, { Component } from 'react';
import { 
    Card, 
    Button, 
    Col, Row, Form
} from 'react-bootstrap';
import RichTextEditor from '../../../utils/RichTextEditor';
import { _ } from 'underscore';

class EducationUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            education_item: props.education_item
        }

        this.handleChange = this.handleChange.bind(this);
        this.cancelFormUpdate = this.cancelFormUpdate.bind(this);
        this.formUpdate = this.formUpdate.bind(this);
    }

    handleChange(event) {
        const { education_item } = this.state;
        education_item[event.target.name] = event.target.value;
        this.setState({
            education_item: education_item,
        })
    }

    cancelFormUpdate() {
        const { handleCancelUpdate } = this.props;
        handleCancelUpdate()
    }

    formUpdate() {
        let { education_item } = this.state;
        const { handleFormState } = this.props;

        education_item.description = localStorage.getItem('ap-content');
        handleFormState(education_item);
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                education_item: this.props.education_item,
            })
        }
    }

    render() {
    	const { education_item } = this.state;

        return (
        	<div>
        		<Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCollegeName">
                            <Form.Label>College Name</Form.Label>    
                            <Form.Control name="college_name" type="text" value={ education_item.college_name } onChange={ this.handleChange } />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCourseName">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control name="course" type="text" value={ education_item.course } onChange={ this.handleChange } />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDuration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control name="duration" type="text" value={ education_item.duration } onChange={ this.handleChange } />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridOrder">
                            <Form.Label>Order</Form.Label>
                            <Form.Control name="order" type="number" value={ education_item.order } onChange={ this.handleChange } />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDescription">
                            <Form.Label>Description</Form.Label>
                            <div className="inintoku-richtext">
                                <RichTextEditor 
                                    content={ education_item.description }
                                    renderToolBar={ true } />
                            </div>
                        </Form.Group>
                    </Form.Row>
                </Form>

                <Button 
                    onClick={ this.formUpdate }
                    variant="outline-success">
                    Submit
                </Button> &nbsp;
                <Button 
                    onClick={ this.cancelFormUpdate }
                    variant="outline-danger">
                    Cancel
                </Button>
            </div>
        );
    }
}

export default EducationUpdate;
