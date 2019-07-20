import React, { Component } from 'react';
import { 
    Card, 
    Button, 
    Col, Row, Form
} from 'react-bootstrap';
import RichTextEditor from '../../../utils/RichTextEditor';

class EducationUpdate extends Component {
    constructor(props) {
        super(props);
        this.handlePushBack = this.handlePushBack.bind(this);
    }

    handlePushBack() {
        const { handleButtonCallback } = this.props;
        handleButtonCallback();
    }

    render() {
    	const item = {
            order: 0,
    		college_name: 'Something',
    		course: 'Something else',
            duration: '2012-2013',
            description: 'Lorem Ipsum'
    	}

        return (
        	<div>
        		<Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCollegeName">
                            <Form.Label>College Name</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCourseName">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDuration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridOrder">
                            <Form.Label>Order</Form.Label>
                            <Form.Control type="number" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDescription">
                            <Form.Label>Description</Form.Label>
                            <div className="inintoku-richtext">
                                <RichTextEditor />
                            </div>
                        </Form.Group>
                    </Form.Row>
                </Form>

                <Button variant="outline-success">
                    Submit
                </Button> &nbsp;
                <Button variant="outline-danger">
                    Cancel
                </Button>
            </div>
        );
    }
}

export default EducationUpdate;
