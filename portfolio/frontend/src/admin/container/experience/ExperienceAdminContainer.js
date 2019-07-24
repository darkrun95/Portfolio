import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setPanel } from '../../../redux/actions/panelActions';
import { setExperience } from '../../../redux/actions/fieldActions';
import ExperienceAdmin from '../../component/experience/ExperienceAdmin.js';
import AlertDelete from '../../../utils/AlertDelete.js';
import Alert from 'react-bootstrap/Alert';

class ExperienceAdminContainer extends Component {
    constructor(props) {
        super(props);
        this.is_cancelled = false
        this.state = {
            experience_list: [],
            deleteModalShow: false,
            delete_id: undefined,
            alert_flag: false,
            alert_message: "",
            alert_variant: "info",
        }

        this.handleErrors = this.handleErrors.bind(this);
        this.initiateFormUpdate = this.initiateFormUpdate.bind(this);
        this.promptDeleteAction = this.promptDeleteAction.bind(this);
        this.renderAlert = this.renderAlert.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
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

        this.props.setExperience({
            experience_id: id
        })
    }

    promptDeleteAction(id) {
        this.setState({
            deleteModalShow: true,
            delete_id: id
        })
    }

    deleteExperience() {
        fetch('/api/experience/' + this.state.delete_id + '/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('acs_token'),
            },
        })
        .then(this.handleErrors)
        .then((response) => {
            let { experience_list } = this.state;
            const index = experience_list.findIndex(obj => obj.id === parseInt(this.state.delete_id));
            const updated_list = [
                ...experience_list.slice(0, index),
                ...experience_list.slice(index + 1)
            ]

            this.setState({    
                experience_list: updated_list,        
                delete_id: undefined,
                alert_flag: true,
                alert_message: "Item deleted successfully",
                alert_variant: "success",
            })
        })
        .catch((error) => {
            this.setState({     
                delete_id: undefined,       
                alert_flag: true,
                alert_message: "Could not delete item.",
                alert_variant: "danger",
            })
            console.error("Error during delete")
        })
    }

    componentWillUnmount() {
        this.is_cancelled = true;
    }

    componentDidMount() {
        fetch('/api/experience-list/', {
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
                    experience_list: json,
                })
            }
        })
        .catch((error) => {
            console.error("Something went wrong.")
        });
    }

    dismissAlert() {
        this.setState({
            alert_flag: false,
            alert_variant: "info",
            alert_message: "",
        })
    }

    renderAlert() {
        const { alert_flag, alert_message, alert_variant } = this.state;
        if (alert_flag) {
            return (
                <div>
                    <Alert dismissible variant={ alert_variant } onClose={ this.dismissAlert } >
                        { alert_message }
                    </Alert>
                </div>
            )
        }
    }

    render() {
        const { experience_list, deleteModalShow, alert_flag } = this.state;
        return (
            <div>
                {
                    alert_flag ? this.renderAlert() : ""
                }
                <AlertDelete 
                    show={ deleteModalShow } 
                    handleSuccess={ () => { 
                        this.setState({ 
                            deleteModalShow: false 
                        }) 

                        this.deleteExperience()
                    } }
                    handleFailure={ () => { 
                        this.setState({ 
                            deleteModalShow: false,
                            delete_id: undefined,
                        }) 
                    } } />
                <ExperienceAdmin 
                    handleDeleteExperience={ this.promptDeleteAction }
                    initiateFormUpdateCallback={ this.initiateFormUpdate }
                    experience_list={ experience_list } />
            </div>
        )
    }
}

export default connect(null, { setPanel, setExperience })(ExperienceAdminContainer);
