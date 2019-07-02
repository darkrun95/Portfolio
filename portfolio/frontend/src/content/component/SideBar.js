import React, { Component } from 'react';
import { ListGroup, Image, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

class SideBar extends Component {
    render() {
        return (
            <div>
                <ListGroup>
                    <ListGroup.Item>
                        <Link
                        to = {{
                            pathname: "/experience",
                        }} >
                            <Image src="/static/inintoku/img/work.svg" className="inintoku-sidebar-icon" />
                            Work Experience
                        </Link>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Link
                        to = {{
                            pathname: "/education",
                        }} >
                            <Image src="/static/inintoku/img/college.svg" className="inintoku-sidebar-icon" />
                            Qualifications
                        </Link>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Link
                        to = {{
                            pathname: "/projects",
                        }} >
                            <Image src="/static/inintoku/img/project.svg" className="inintoku-sidebar-icon" />
                            Projects
                        </Link>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Link
                        to = {{
                            pathname: "/skills",
                        }} >
                            <Image src="/static/inintoku/img/skills.svg" className="inintoku-sidebar-icon" />
                            Technical Skills
                        </Link>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Link
                        to = {{
                            pathname: "/volunteering",
                        }} >
                            <Image src="/static/inintoku/img/activities.svg" className="inintoku-sidebar-icon" />
                            Technical Skills
                        </Link>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}

export default SideBar;
