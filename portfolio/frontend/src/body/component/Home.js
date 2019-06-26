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
                        <Col lg={4} md={4} sm={4} xs={12}>
                            <Image src="/static/inintoku/img/face.jpg" rounded fluid />
                        </Col>
                        <Col lg={4} md={4} sm={4} xs={6} className="inintoku-main">
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