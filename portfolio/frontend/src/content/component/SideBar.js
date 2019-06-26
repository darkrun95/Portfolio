import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";

class SideBar extends Component {
    render() {
        return (
            <div>
                <ListGroup>
                    <ListGroup.Item action href="#experience">Work Experience</ListGroup.Item>
                    <ListGroup.Item action href="#education">Education Qualifications</ListGroup.Item>
                    <ListGroup.Item action href="#activities">Extra-curricular activities</ListGroup.Item>
                    <ListGroup.Item action href="#projects">Projects</ListGroup.Item>
                    <ListGroup.Item action href="#skills">Technical Skills</ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}

export default SideBar;
