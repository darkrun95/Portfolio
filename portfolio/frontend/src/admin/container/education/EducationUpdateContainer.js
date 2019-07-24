import React, { Component } from 'react';
import { connect } from 'react-redux';

import EducationUpdate from '../../component/education/EducationUpdate';
import { setPanel } from '../../../redux/actions/panelActions';
import store from '../../../store';

class EducationUpdateContainer extends Component {
    constructor(props) {
        super(props);
        this.is_cancelled = false
        this.state = {
        	redirect: false,
        	education_id: store.getState().adminField.education_id,
            education_item: {
                college_name: '',
                course: '',
                order: '',
                duration: '',
                description: {
                    document: {
                        nodes: [
                            {
                                object: 'block',
                                type: 'paragraph',
                                nodes: [
                                    {
                                        object: 'text',
                                        text: 'Education Description',
                                    },
                                ],
                            },
                        ],
                    },
                },
            },
        }

        this.cancelFormUpdate = this.cancelFormUpdate.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.uploadFormContent = this.uploadFormContent.bind(this);
    }

    componentWillUnmount() {
        store.subscribe(() => {})
        this.is_cancelled = true;
    }

    cancelFormUpdate() {
    	this.setState({
            redirect: true
        }, () => {
            this.renderRedirect();
        })
	}

    uploadFormContent(education_item) {
        const { education_id } = this.state;
        let fetch_url = '/api/education/'
        if (education_id) {
            fetch_url = fetch_url + education_id + '/'
        } 

        fetch(fetch_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('acs_token'),
            },
            body: JSON.stringify(education_item)
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
            console.log("Error during update")
        })
    }

	renderRedirect() {
        const { redirect } = this.state;
        if (redirect) {
            this.props.setPanel({
				selectedElement: 'qualifications', 
				changePanel: true
			})
        }
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response
    }

    componentDidMount() {
        const { education_id } = this.state;
        if (education_id) {    
            fetch('/api/education/' + education_id + '/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('acs_token'),
                },
            })
            .then(this.handleErrors)
            .then(response => response.json())
            .then(json => {
                if (json && !this.is_cancelled) {
                    json['description'] = JSON.parse(json['description'])
                    this.setState({
                        education_item: json,
                    })
                }
            })
            .catch((error) => {
                console.error("Something went wrong.")
            });
        }
    }

    render() {
        const { education_item } = this.state;
        return (
            <EducationUpdate 
                education_item = { education_item }
                handleFormState = { this.uploadFormContent }
                handleCancelUpdate = { this.cancelFormUpdate } />
        );
    }
}

export default connect(null, { setPanel })(EducationUpdateContainer);