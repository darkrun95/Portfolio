import React, { Component } from 'react';
import { 
	Container, 
	Col, 
	Row, 
	Image 
} from 'react-bootstrap';

class Experience extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col lg={3} md={3} sm={4} xs={12} className="inintoku-center">
                            <Image src="/static/inintoku/img/face.jpg" roundedCircle thumbnail />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Experience;