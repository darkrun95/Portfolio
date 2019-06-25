import React, { Component } from 'react';
import Container from '@material-ui/core/Container';

class Home extends Component {
	render() {
		return (
            <div>
                <Container maxWidth="md">
                    <h1>Hello, </h1>
                    <p>
                        I'm Arun Pottekat, a Melbourne-based Developer <br/>
                        devloping clean and modern code for the world-wide-web.
                    </p>
                </Container>
            </div>
		);
	}
}

export default Home;
