import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileUpdate from '../../component/profile/ProfileUpdate';
import store from '../../../store';
import { setPanel } from '../../../redux/actions/panelActions';

class ProfileUpdateContainer extends Component {
    constructor(props) {
        super(props);
        this.is_cancelled = false
        this.state = {
			profile: undefined,
            redirect: false
		}

        store.subscribe(() => {
        	const { profile } = this.state;
        	profile.profile_image = store.getState().adminPanelSelection.profile_image

            if (!this.is_cancelled) {
    			this.setState({
    				profile: profile,
    				redirect: false
    			})
            }
		})

		this.handleErrors = this.handleErrors.bind(this);
		this.submitProfile = this.submitProfile.bind(this);
		this.renderRedirect = this.renderRedirect.bind(this);
        this.cancelFormUpdate = this.cancelFormUpdate.bind(this);
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response
    }

    componentWillUnmount() {
        store.subscribe(() => {})
        this.is_cancelled = true;
    }

    submitProfile(profile) {
    	fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('acs_token'),
            },
            body: JSON.stringify(profile)
        })
        .then(this.handleErrors)
        .then(response => response.json())
        .then(json => {
            if (json && !this.is_cancelled) {
                this.setState({
                	redirect: true
                }, () => {
                	this.renderRedirect();
                })
            }
        })
        .catch((error) => {
            console.error("Something went wrong.")
        });
    }

    cancelFormUpdate() {
        this.setState({
            redirect: true
        }, () => {
            this.renderRedirect();
        })
    }

    renderRedirect() {
        const { redirect } = this.state;
        if (redirect) {
            this.props.setPanel({
				selectedElement: 'profile', 
				changePanel: true
			})
        }
    }

    componentDidMount() {
        fetch('/api/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(this.handleErrors)
        .then(response => response.json())
        .then(json => {
            if (json && !this.is_cancelled) {
                this.setState({
                    profile: json,
                })
            }
        })
        .catch((error) => {
            console.error("Something went wrong.")
        });
    }

    render() {
    	const { profile } = this.state;
        return (
            <ProfileUpdate 
            	profile={ profile }
                handleCancelUpdate = { this.cancelFormUpdate }
            	handleSubmitProfile={ this.submitProfile } />
        );
    }
}

export default connect(null, { setPanel })(ProfileUpdateContainer);
