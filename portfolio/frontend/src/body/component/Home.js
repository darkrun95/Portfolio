import React, { Component } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

class Home extends Component {
	render() {
		return (
            <div>
                <Jumbotron fluid>
                    <Container>
                        <h1>Arun Pottekat</h1>
                        <p>
                            Something magical is soon about to come ...
                            <br />
                            For the time being, why not read some <strong>blog posts</strong>
                        </p>
                    </Container>
                </Jumbotron>
            </div>
		);
	}
}

export default Home;
