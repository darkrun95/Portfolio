import React, { Component } from 'react';
import { connect } from 'react-redux';

import VolunteeringUpdate from '../../component/volunteer/VolunteeringUpdate';
import { setPanel } from '../../../redux/actions/panelActions';
import store from '../../../store';

class VolunteeringUpdateContainer extends Component {
    constructor(props) {
        super(props);
        this.is_cancelled = false
        this.state = {
        	redirect: false,
        	volunteering_id: store.getState().adminField.volunteering_id,
            volunteering_item: {
                volunteer_name: '',
                organization: '',
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
                                        text: 'Volunteering Description',
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

    uploadFormContent(volunteering_item) {
        const { volunteering_id } = this.state;
        let fetch_url = '/api/volunteer/'
        if (volunteering_id) {
            fetch_url = fetch_url + volunteering_id + '/'
        } 

        fetch(fetch_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('acs_token'),
            },
            body: JSON.stringify(volunteering_item)
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
				selectedElement: 'volunteering', 
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
        const { volunteering_id } = this.state;
        if (volunteering_id) {    
            fetch('/api/volunteer/' + volunteering_id + '/', {
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
                        volunteering_item: json,
                    })
                }
            })
            .catch((error) => {
                console.error("Something went wrong.")
            });
        }
    }

    render() {
        const { volunteering_item } = this.state;
        return (
            <VolunteeringUpdate 
                volunteering_item = { volunteering_item }
                handleFormState = { this.uploadFormContent }
                handleCancelUpdate = { this.cancelFormUpdate } />
        );
    }
}

export default connect(null, { setPanel })(VolunteeringUpdateContainer);