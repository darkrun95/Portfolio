import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExperienceUpdate from '../../component/experience/ExperienceUpdate';
import { setPanel } from '../../../redux/actions/panelActions';
import store from '../../../store';

class ExperienceUpdateContainer extends Component {
    constructor(props) {
        super(props);
        this.is_cancelled = false
        this.state = {
        	redirect: false,
        	experience_id: store.getState().adminField.experience_id,
            experience_item: {
                order: '',
                company_name: '',
                duration: '',
                role: '',
                display_url: '',
                url: '',
                description: '',
                description: {
                    document: {
                        nodes: [
                            {
                                object: 'block',
                                type: 'paragraph',
                                nodes: [
                                    {
                                        object: 'text',
                                        text: 'Experience Description',
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

    uploadFormContent(experience_item) {
        const { experience_id } = this.state;
        let fetch_url = '/api/experience/'
        if (experience_id) {
            fetch_url = fetch_url + experience_id + '/'
        } 

        fetch(fetch_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('acs_token'),
            },
            body: JSON.stringify(experience_item)
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
				selectedElement: 'experience', 
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
        const { experience_id } = this.state;
        if (experience_id) {    
            fetch('/api/experience/' + experience_id + '/', {
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
                        experience_item: json,
                    })
                }
            })
            .catch((error) => {
                console.error("Something went wrong.")
            });
        }
    }

    render() {
        const { experience_item } = this.state;
        return (
            <ExperienceUpdate 
                experience_item = { experience_item }
                handleFormState = { this.uploadFormContent }
                handleCancelUpdate = { this.cancelFormUpdate } />
        );
    }
}

export default connect(null, { setPanel })(ExperienceUpdateContainer);