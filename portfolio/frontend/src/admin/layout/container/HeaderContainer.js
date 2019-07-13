import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../component/Header.js';

class HeaderContainer extends Component {
	constructor(props) {
		super(props);
		this.handleButton = this.handleButton.bind(this);
		this.renderRedirect = this.renderRedirect.bind(this);

		this.state = {
			redirect: false
		}
	}

	handleButton() {
		this.setState({
			redirect: true
		})
	}

	renderRedirect() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/logout" />
        }
    }

	render() {
		const { redirect } = this.state;

		return (
			<div className="inintoku-admin-header">
			{
                redirect ? this.renderRedirect() :
				<Header handleButtonCallback={ this.handleButton } />
			}
			</div>
		)
	}
}

export default HeaderContainer;