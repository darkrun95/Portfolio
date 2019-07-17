import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setPanel } from '../../../redux/actions/panelActions';
import ProfileAdmin from '../../component/profile/ProfileAdmin.js';

class ProfileAdminContainer extends Component {
    constructor(props) {
        super(props);
        this.is_cancelled = false
        this.state = {
            profile: undefined,
        }

        this.handleErrors = this.handleErrors.bind(this);
        this.initiateFormUpdate = this.initiateFormUpdate.bind(this);
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response
    }

    initiateFormUpdate(panel) {
        this.props.setPanel({
            selectedElement: panel,
            changePanel: false
        })
    }

    componentWillUnmount() {
        this.is_cancelled = true;
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
            <ProfileAdmin 
                initiateFormUpdateCallback={ this.initiateFormUpdate }
                profile={ profile } />
        )
    }
}

export default connect(null, { setPanel })(ProfileAdminContainer);
