import React, { Component } from 'react';
import Container from '@material-ui/core/Container';

class Home extends Component {
	render() {
		return (
            <div>
                <Container maxWidth="md">
                    <h1>Arun Pottekat</h1>
                    <p>
                        Something magical is soon about to come ...
                        <br />
                        For the time being, why not read some <strong>blog posts</strong>
                    </p>
                </Container>
            </div>
		);
	}
}

export default Home;
