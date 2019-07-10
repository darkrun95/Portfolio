import React, { Component } from 'react';
import PortfolioAdmin from '../component/PortfolioAdmin'
import { check_authentication } from '../../utils/utils.js'

class PortfolioAdminContainer extends Component {
	constructor(props) {
		super(props);

		this.handleButton = this.handleButton.bind(this);
	}

	componentDidMount() {
        check_authentication().then(response => {
            if (!response) {
                this.props.history.push('/manage/')    
            }
        })
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
