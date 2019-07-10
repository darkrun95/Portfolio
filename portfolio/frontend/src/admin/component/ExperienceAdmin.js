import React, { Component } from 'react';
import { 
    Card, 
    Button, 
    Image,
    Col, Row
} from 'react-bootstrap';
import { _ } from 'underscore';

class ExperienceAdmin extends Component {
    constructor(props) {
        super(props);
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

    render() {
        const { experience_list } = this.state;
        return (
            <div>
                <Row>
                    {
                        experience_list.map((item, index) => {
                            return (
                                <Col lg={4} md={6} sm={12} xs={12} key={`${index}`}>
                                    <Card className="inintoku-admin-card">
                                        <Card.Header>
                                            <Card.Title>{ item.company_name }</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                <strong>{ item.role }</strong>
                                            </Card.Text>
                                            <Card.Text>
                                                { item.duration }
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>{ item.url }</strong>
                                            </Card.Text>
                                            <Card.Text>
                                                { item.description }
                                            </Card.Text>
                                            <Button variant="outline-dark">Edit</Button> &nbsp;
                                            <Button variant="outline-danger">Delete</Button>
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
                                    <Button variant="outline-success">Add</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ExperienceAdmin;