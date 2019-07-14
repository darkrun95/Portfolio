import React, { Component } from 'react';
import SideBar from '../component/SideBar';

class SideBarContainer extends Component {
	constructor(props) {
		super(props);
		this.handleErrors = this.handleErrors.bind(this);

        this.state = {
            skill_list: [],
        }
	}

	handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response
    }

    componentDidMount() {
        fetch('/api/skill-list/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(this.handleErrors)
        .then(response => response.json())
        .then(json => {
            this.setState({
                skill_list: json,
            })
        })
        .catch((error) => {
            this.setState({
                skill_list: [],
            })
            console.error("Something went wrong.")
        });
    }

    render() {
    	const { skill_list } = this.state;
    	
        return (
            <div>
                <SideBar skill_list={ skill_list } />
            </div>
        );
    }
}

export default SideBarContainer;
