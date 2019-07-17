import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import SideBarContainer from '../layout/container/SideBarContainer.js';
import BodyContainer from '../layout/container/BodyContainer.js';
import HeaderContainer from '../layout/container/HeaderContainer.js';
import { _ } from 'underscore';

class PortfolioAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile_image: props.profile_image
        }
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                profile_image: this.props.profile_image,
            })
        }
    }

    render() {
        const { profile_image } = this.state;
        return (
            <div className="no-style">
                <Row>
                    <Col lg={2} md={3} xs={2} className="inintoku-admin-sidebar-container">
                        <SideBarContainer profile_image={ profile_image } />
                    </Col>

                    <Col lg={10} md={9} xs={10} className="inintoku-admin-dashboard">
                        <HeaderContainer />
                        <BodyContainer />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PortfolioAdmin;