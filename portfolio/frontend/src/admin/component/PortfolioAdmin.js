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

class PortfolioAdmin extends Component {
    render() {
        return (
            <div>
                <Container>
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
                            <Row>
                                <Col lg={4} md={6} sm={12} xs={12}>
                                    <Card className="inintoku-admin-card">
                                        <Card.Header>
                                            <Image className="inintoku-card-image" 
                                               src="/static/inintoku/img/login.jpg" 
                                               fluid
                                               rounded
                                               thumbnail />
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>Card Title</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                            </Card.Text>
                                            <Button variant="outline-dark">Edit</Button> &nbsp;
                                            <Button variant="outline-danger">Delete</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col lg={4} md={6} sm={12} xs={12}>
                                    <Card className="inintoku-admin-card">
                                        <Card.Header>
                                            <Image className="inintoku-card-image" 
                                               src="/static/inintoku/img/login.jpg" 
                                               fluid
                                               rounded
                                               thumbnail />
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>Card Title</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                            </Card.Text>
                                            <Button variant="outline-dark">Edit</Button> &nbsp;
                                            <Button variant="outline-danger">Delete</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col lg={4} md={6} sm={12} xs={12}>
                                    <Card className="inintoku-admin-card">
                                        <Card.Header>
                                            <Image className="inintoku-card-image" 
                                               src="/static/inintoku/img/login.jpg" 
                                               fluid
                                               rounded
                                               thumbnail />
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>Card Title</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                            </Card.Text>
                                            <Button variant="outline-dark">Edit</Button> &nbsp;
                                            <Button variant="outline-danger">Delete</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default PortfolioAdmin;