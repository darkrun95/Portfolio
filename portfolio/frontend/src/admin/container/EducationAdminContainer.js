import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setPanel } from '../../redux/actions/panelActions';
import { setEducation } from '../../redux/actions/fieldActions';
import EducationAdmin from '../component/EducationAdmin.js';

class EducationAdminContainer extends Component {
    constructor(props) {
        super(props);
        this.is_cancelled = false
        this.state = {
            education_list: [],
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

    initiateFormUpdate(panel, id = undefined) {
        this.props.setPanel({
            selectedElement: panel,
            changePanel: false
        })

        this.props.setEducation({
            education_id: id
        })
    }

    componentWillUnmount() {
        this.is_cancelled = true;
    }

    componentDidMount() {
        fetch('/api/education-list/', {
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
                    education_list: json,
                })
            }
        })
        .catch((error) => {
            console.error("Something went wrong.")
        });
    }

    render() {
        const { education_list } = this.state;
        return (
            <EducationAdmin 
                initiateFormUpdateCallback={ this.initiateFormUpdate }
                education_list={ education_list } />
        )
    }
}

export default connect(null, { setPanel, setEducation })(EducationAdminContainer);