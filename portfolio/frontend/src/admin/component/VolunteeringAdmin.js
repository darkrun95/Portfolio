import React, { Component } from 'react';
import { 
    Card, 
    Button, 
    Image,
    Col, Row
} from 'react-bootstrap';
import { _ } from 'underscore';

class VolunteeringAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volunteering_list: props.volunteering_list,
        }
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                volunteering_list: this.props.volunteering_list,
            })
        }
    }

    render() {
        const { volunteering_list } = this.state;
        return (
            <div>
                <Row>
                    {
                        volunteering_list.map((item, index) => {
                            return (
                                <Col lg={4} md={6} sm={12} xs={12} key={`${index}`}>
                                    <Card className="inintoku-admin-entry-card">
                                        <Card.Body>
                                            <Card.Subtitle className="mb-2">
                                                { item.volunteer_name }<br/> <small>{ item.organization }</small>
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

export default VolunteeringAdmin;