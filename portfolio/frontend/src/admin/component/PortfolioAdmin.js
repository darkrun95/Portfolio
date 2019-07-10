import React, { Component } from 'react';
import { 
    Container, 
    Card, 
    Nav, 
    Button, 
    Row,
    Image,
    Col
} from 'react-bootstrap';
import ExperienceAdminContainer from '../container/ExperienceAdminContainer.js';

class PortfolioAdmin extends Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut() {
        const { handleButtonCallback } = this.props;
        handleButtonCallback();
    }

    render() {
        return (
            <div>
                <Container>
                    <Button 
                        variant="outline-danger"
                        onClick={ this.handleLogOut }>Log Out</Button>
                    <div className="inintoku-vertical-space"></div>
                    <Card>
                        <Card.Header>
                            <Nav variant="tabs" defaultActiveKey="#experience">
                                <Nav.Item>
                                    <Nav.Link href="#experience">Experience</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#education">Education</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#projects">Projects</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#skills">Skills</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#volunteering">Volunteering</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <Card.Body>
                            <ExperienceAdminContainer />
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default PortfolioAdmin;