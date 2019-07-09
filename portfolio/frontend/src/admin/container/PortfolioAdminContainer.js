import React, { Component } from 'react';
import PortfolioAdmin from '../component/PortfolioAdmin'

class PortfolioAdminContainer extends Component {
	constructor(props) {
		super(props);
		/*fetch('api/check-authenticated/', {
			
		})*/
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
