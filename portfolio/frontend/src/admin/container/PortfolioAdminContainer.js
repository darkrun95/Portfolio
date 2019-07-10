import React, { Component } from 'react';
import PortfolioAdmin from '../component/PortfolioAdmin'

class PortfolioAdminContainer extends Component {
	constructor(props) {
		super(props);
		const acs_token = localStorage.getItem('acs_token');

		if (acs_token !== null) {	
			fetch('/api/check-authenticated/'+acs_token+'/',{
				method: 'GET',
				headers: {
	                'Content-Type': 'application/json'
	            },
			})
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText)
				}
				return response
			})
			.catch((error) => {
				props.history.push('/manage')
			})
		} else {
			props.history.push('/manage')
		}

		this.handleButton = this.handleButton.bind(this);
	}

	handleButton() {
		this.props.history.push('/logout')
	}

    render() {
        return (
        	<div className="adminContainer">
	            <PortfolioAdmin handleButtonCallback={ this.handleButton } />
            </div>
        )
    }
}

export default PortfolioAdminContainer;
