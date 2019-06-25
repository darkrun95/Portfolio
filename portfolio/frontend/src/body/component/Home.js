import React, { Component } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

class Home extends Component {
	render() {
		return (
            <div>
                <Jumbotron fluid>
                    <Container>
                        <div className="row"> 
                            <div className="col-md-7">
                                <h1>Hello, </h1>
                                <p>
                                    I'm Arun Pottekat, a Melbourne-based Developer <br/>
                                    devloping clean and modern code for the world-wide-web.
                                </p>
                            </div>
                            <div className="col-md-5">
                                <Image src="/static/inintoku/img/face.jpg" rounded fluid />
                            </div>
                        </div>
                    </Container>
                </Jumbotron>
            </div>
		);
	}
}

export default Home;