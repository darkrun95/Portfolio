import React, { Component } from 'react';
import PortfolioAdmin from '../component/PortfolioAdmin'
import { check_authentication } from '../../utils/utils.js'

class PortfolioAdminContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
        check_authentication().then(response => {
            if (!response) {
                this.props.history.push('/manage/')    
            }
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
