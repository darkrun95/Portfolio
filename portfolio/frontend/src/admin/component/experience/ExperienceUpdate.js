import React, { Component } from 'react';
import { 
    Card, 
    Button, 
    Col, Row, Form
} from 'react-bootstrap';
import RichTextEditor from '../../../utils/RichTextEditor';
import { _ } from 'underscore';

class ExperienceUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experience_item: props.experience_item
        }

        this.handleChange = this.handleChange.bind(this);
        this.cancelFormUpdate = this.cancelFormUpdate.bind(this);
        this.formUpdate = this.formUpdate.bind(this);
    }

    handleChange(event) {
        const { experience_item } = this.state;
        experience_item[event.target.name] = event.target.value;
        this.setState({
            experience_item: experience_item,
        })
    }

    cancelFormUpdate() {
        const { handleCancelUpdate } = this.props;
        handleCancelUpdate()
    }

    formUpdate() {
        let { experience_item } = this.state;
        const { handleFormState } = this.props;

        experience_item.description = localStorage.getItem('ap-content');
        handleFormState(experience_item);
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                experience_item: this.props.experience_item,
            })
        }
    }

    render() {
    	const { experience_item } = this.state;

        return (
        	<div>
        		<Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCompanyName">
                            <Form.Label>Company Name</Form.Label>    
                            <Form.Control name="company_name" type="text" value={ experience_item.company_name } onChange={ this.handleChange } />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control name="role" type="text" value={ experience_item.role } onChange={ this.handleChange } />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDisplayURL">
                            <Form.Label>Display URL</Form.Label>
                            <Form.Control name="display_url" type="text" value={ experience_item.display_url } onChange={ this.handleChange } />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridURL">
                            <Form.Label>URL</Form.Label>
                            <Form.Control name="url" type="text" value={ experience_item.url } onChange={ this.handleChange } />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDuration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control name="duration" type="text" value={ experience_item.duration } onChange={ this.handleChange } />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridOrder">
                            <Form.Label>Order</Form.Label>
                            <Form.Control name="order" type="number" value={ experience_item.order } onChange={ this.handleChange } />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDescription">
                            <Form.Label>Description</Form.Label>
                            <div className="inintoku-richtext">
                                <RichTextEditor 
                                    content={ experience_item.description }
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

export default ExperienceUpdate;
