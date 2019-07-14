import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Header extends Component {
	constructor(props) {
		super(props);
		this.handleLogOut = this.handleLogOut.bind(this);
	}

	handleLogOut() {
        const { handleButtonCallback } = this.props;
        handleButtonCallback();
    }

	render() {
		return (
			<div>
				<Button 
                		className="inintoku-change-password-button inintoku-change-password-header-btn"
	                    variant="outline-warning"
	                    onClick={ this.handleLogOut }>Change Password</Button> &nbsp;
				<Button 
                    variant="outline-danger"
                    onClick={ this.handleLogOut }>Log Out</Button>
			</div>
		)
	}
}

export default Header;