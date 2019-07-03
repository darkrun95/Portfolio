import React, { Component } from 'react';
import { ListGroup, Image, Col, Modal, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.handleModal = this.handleModal.bind(this);

        this.state = {
            show: false,
        };
    }

    handleModal() {
        const currentState = this.state.show;
        this.setState({ 
            show: !currentState,
        });
    }

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

                    <ListGroup.Item onClick={ this.handleModal } >
                        <Image src="/static/inintoku/img/skills.svg" className="inintoku-sidebar-icon" />
                        Technical Skills

                        <Modal show={ this.state.show } 
                               onHide={ this.handleModal }
                               animation={ true } >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    <h6>Technical Skills</h6>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <span>
                                    <Button 
                                        className="inintoku-skill-button"
                                        variant="outline-dark">
                                        Python
                                    </Button>
                                </span>
                            </Modal.Body>
                        </Modal>
                    </ListGroup.Item>

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
