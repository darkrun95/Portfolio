import React, { Component } from 'react';
import { Jumbotron, Container, ListGroup } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

class Home extends Component {
	render() {
		return (
            <div>
                <Container>
                    <div className="row"> 
                        <div className="col-md-3">
                            <ListGroup>
                                <ListGroup.Item>Education Qualifications</ListGroup.Item>
                                <ListGroup.Item>Projects</ListGroup.Item>
                                <ListGroup.Item>Extra-curricular activities</ListGroup.Item>
                                <ListGroup.Item>Technical Skills</ListGroup.Item>
                            </ListGroup>
                        </div>
                        <div className="col-md-5 col-xs-5 col-sm-5">
                            <h2>Hello, </h2>
                            <p>
                                I'm <strong>Arun Pottekat</strong>, a Melbourne-based Developer <br/>
                                devloping clean and modern code for the World Wide Web.
                            </p>
                        </div>
                        <div className="col-md-4 col-xs-4 col-sm-4">
                            <Image src="/static/inintoku/img/face.jpg" rounded fluid />
                        </div>
                    </div>
                </Container>
            </div>
		);
	}
}

export default Home;