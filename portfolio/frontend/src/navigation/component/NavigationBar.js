import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: props.logged_in,
        }
    }

    render() {
        const { loggedin } = this.state;
        return (
            <div>
                <Navbar className="inintoku-navbar" collapseOnSelect expand="lg" bg="light" variant="light">
                    <Link
                        className="navbar-brand"
                        to = {{
                            pathname: "/",
                        }} ><strong>Portfolio</strong></Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {/*<Link
                                className="nav-link"
                                to = {{
                                    pathname: "/posts/",
                                    state: {fromDashboard: false},
                                }} >Educational Qualification</Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
