import React, { Component } from 'react';
import { ListGroup, Image, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

class SideBar extends Component {
    render() {
        return (
            <div>
                <ListGroup>
                    <Link
                        to = {{
                            pathname: "/experience",
                        }} >
                        <ListGroup.Item>
                            <Image src="/static/inintoku/img/work.svg" className="inintoku-sidebar-icon" />
                            Experience
                        </ListGroup.Item>
                    </Link>

                    <Link
                        to = {{
                            pathname: "/education",
                        }} >
                        <ListGroup.Item>
                            <Image src="/static/inintoku/img/college.svg" className="inintoku-sidebar-icon" />
                            Qualifications
                        </ListGroup.Item>
                    </Link>
                    
                    <Link
                        to = {{
                            pathname: "/projects",
                        }} >
                        <ListGroup.Item>
                            <Image src="/static/inintoku/img/project.svg" className="inintoku-sidebar-icon" />
                            Projects
                        </ListGroup.Item>
                    </Link>

                    <Link
                        to = {{
                            pathname: "/skills",
                        }} >
                        <ListGroup.Item>
                            <Image src="/static/inintoku/img/skills.svg" className="inintoku-sidebar-icon" />
                            Technical Skills
                        </ListGroup.Item>
                    </Link>

                    <Link
                        to = {{
                            pathname: "/volunteering",
                        }} >
                        <ListGroup.Item>
                            <Image src="/static/inintoku/img/activities.svg" className="inintoku-sidebar-icon" />
                            Volunteering
                        </ListGroup.Item>
                    </Link>
                </ListGroup>
            </div>
        );
    }
}

export default SideBar;
