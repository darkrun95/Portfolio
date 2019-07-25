import React, { Component } from 'react';
import { 
    Card, 
    Button, 
    Col, Row, Form
} from 'react-bootstrap';
import RichTextEditor from '../../../utils/RichTextEditor';
import { _ } from 'underscore';

class VolunteeringUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volunteering_item: props.volunteering_item
        }

        this.handleChange = this.handleChange.bind(this);
        this.cancelFormUpdate = this.cancelFormUpdate.bind(this);
        this.formUpdate = this.formUpdate.bind(this);
    }

    handleChange(event) {
        const { volunteering_item } = this.state;
        volunteering_item[event.target.name] = event.target.value;
        this.setState({
            volunteering_item: volunteering_item,
        })
    }

    cancelFormUpdate() {
        const { handleCancelUpdate } = this.props;
        handleCancelUpdate()
    }

    formUpdate() {
        let { volunteering_item } = this.state;
        const { handleFormState } = this.props;

        volunteering_item.description = localStorage.getItem('ap-content');
        handleFormState(volunteering_item);
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                volunteering_item: this.props.volunteering_item,
            })
        }
    }

    render() {
    	const { volunteering_item } = this.state;

        return (
        	<div>
        		<Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridVolunteerName">
                            <Form.Label>Volunteer Name</Form.Label>    
                            <Form.Control name="volunteer_name" type="text" value={ volunteering_item.volunteer_name } onChange={ this.handleChange } />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridOrganization">
                            <Form.Label>Organization</Form.Label>
                            <Form.Control name="organization" type="text" value={ volunteering_item.organization } onChange={ this.handleChange } />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDuration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control name="duration" type="text" value={ volunteering_item.duration } onChange={ this.handleChange } />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridOrder">
                            <Form.Label>Order</Form.Label>
                            <Form.Control name="order" type="number" value={ volunteering_item.order } onChange={ this.handleChange } />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDescription">
                            <Form.Label>Description</Form.Label>
                            <div className="inintoku-richtext">
                                <RichTextEditor 
                                    content={ volunteering_item.description }
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

export default VolunteeringUpdate;
