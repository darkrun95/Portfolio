import React, { Component } from 'react';
import { ListGroup, Image, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

class SideBar extends Component {
    render() {
        return (
            <div>
                <ListGroup>
                    <ListGroup.Item action href="#experience">
                        <Image src="/static/inintoku/img/work.svg" className="inintoku-sidebar-icon" />
                        Work Experience
                    </ListGroup.Item>
                    
                    <ListGroup.Item action href="#education">
                        <Image src="/static/inintoku/img/college.svg" className="inintoku-sidebar-icon" />
                        Qualifications
                    </ListGroup.Item>
                    
                    <ListGroup.Item action href="#projects">
                        <Image src="/static/inintoku/img/project.svg" className="inintoku-sidebar-icon" />
                        Projects
                    </ListGroup.Item>
                    
                    <ListGroup.Item action href="#skills">
                        <Image src="/static/inintoku/img/skills.svg" className="inintoku-sidebar-icon" />
                        Technical Skills
                    </ListGroup.Item>
                    
                    <ListGroup.Item action href="#activities">
                        <Image src="/static/inintoku/img/activities.svg" className="inintoku-sidebar-icon" />
                        Volunteering
                    </ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}

export default SideBar;
