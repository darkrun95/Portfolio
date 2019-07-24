import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'
import { _ } from 'underscore';

class AlertDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	show: props.show,
			handleSuccess: props.handleSuccess,
			handleFailure: props.handleFailure,
        }
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                show: this.props.show,
                handleSuccess: this.props.handleSuccess,
				handleFailure: this.props.handleFailure,
            })
        }
    }

    render() {
    	const { show, handleSuccess, handleFailure } = this.state;
        return (
            <div>
            	<Modal show={ show } onHide = { () => { console.log("Select an option: Yes or No to close the modal")} }>
					<Modal.Header>
						<Modal.Title>
							Delete 
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>
							Are you sure, you want to delete this item?
						</p>
					</Modal.Body>
					<Modal.Footer>
						<Button 
							onClick={ handleSuccess }
							variant='outline-success'>Yes</Button>
						<Button 
							onClick={ handleFailure }
							variant='outline-danger'>No</Button>
					</Modal.Footer>
				</Modal>
            </div>
        );
    }
}

export default AlertDelete;
