import React, { Component } from 'react';
import PortfolioAdmin from '../component/PortfolioAdmin'

class PortfolioAdminContainer extends Component {
	constructor(props) {
		super(props);
		const tokenid = localStorage.getItem('tokenid');
		fetch('/api/check-authenticated/'+tokenid+'/',{
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
	}

    render() {
        return (
        	<div className="adminContainer">
	            <PortfolioAdmin />
            </div>
        )
    }
}

export default PortfolioAdminContainer;
