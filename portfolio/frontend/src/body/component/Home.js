import React, { Component } from 'react';
import { Jumbotron, Container, Col, Row } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import MainContentContainer from '../../content/container/MainContentContainer.js';
import SideBarContainer from '../../content/container/SideBarContainer.js';

class Home extends Component {
	render() {
		return (
            <div>
                <Container>
                    <Row>
                        <Col lg={3} md={3} sm={4} xs={12} className="inintoku-center">
                            <Image src="/static/inintoku/img/face.jpg" roundedCircle thumbnail />
                        </Col>
                        <Col lg={5} md={5} sm={4} xs={6} className="inintoku-main">
                            <MainContentContainer />
                        </Col>
                        <Col lg={4} md={4} sm={4} xs={6} className="inintoku-main">
                            <SideBarContainer />
                        </Col>
                    </Row>
                </Container>
            </div>
		);
	}
}

export default Home;