import React, { Component } from 'react';
import PortfolioAdmin from '../component/PortfolioAdmin'
import { check_authentication } from '../../utils/utils.js'

class PortfolioAdminContainer extends Component {
	constructor(props) {
		super(props);

        this.state = {
            profile_image: undefined,
        }
	}

	componentDidMount() {
        check_authentication().then(response => {
            if (!response) {
                this.props.history.push('/manage/')    
            }
        })

        fetch('/api/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(this.handleErrors)
        .then(response => response.json())
        .then(json => {
            if (json) {
                this.setState({
                    profile_image: json.profile_image,
                })
            }
        })
        .catch((error) => {
            console.error("Something went wrong.")
        });
    }

    render() {
        const { profile_image } = this.state;
        return (
        	<div className="adminContainer">
	            <PortfolioAdmin profile_image={ profile_image } />
            </div>
        )
    }
}

export default PortfolioAdminContainer;
