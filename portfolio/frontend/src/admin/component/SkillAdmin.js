import React, { Component } from 'react';
import { 
    Card, 
    Button, 
    Image,
    Col, Row
} from 'react-bootstrap';
import { _ } from 'underscore';

class SkillAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skill_list: props.skill_list,
        }
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                skill_list: this.props.skill_list,
            })
        }
    }

    render() {
        const { skill_list } = this.state;
        return (
            <div>
                <Row>
                    {
                        skill_list.map((item, index) => {
                            return (
                                <Col lg={3} md={6} sm={12} xs={12} key={`${index}`}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Subtitle className="mb-2">
                                                { item.skill_name }<br/> <small>{ item.skill_type }</small>
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

export default SkillAdmin;