import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import SideBarContainer from '../layout/container/SideBarContainer.js';
import BodyContainer from '../layout/container/BodyContainer.js';
import HeaderContainer from '../layout/container/HeaderContainer.js';

class PortfolioAdmin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="no-style">
                <Row>
                    <Col lg={2} md={1} sm={1} xs={1} className="inintoku-admin-sidebar-container">
                        <SideBarContainer />
                    </Col>

                    <Col lg={10} md={1} sm={1} xs={1} className="inintoku-admin-dashboard">
                        <HeaderContainer />
                        <BodyContainer />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PortfolioAdmin;