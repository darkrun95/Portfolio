import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';

import { Row, Col, Alert } from 'react-bootstrap';
import { setImage } from '../redux/actions/panelActions';

class DropzoneComponent extends Component {
	constructor(props) {
		super(props);
		this.onDrop = this.onDrop.bind(this);

		this.state = {
			acs_token: localStorage.getItem('acs_token'),
		}
	}

	onDrop(acceptedFiles) {
		acceptedFiles.forEach(file => {
			let data = new FormData();
			data.append('file', file);
			data.append('file_name', file.name);
			
			fetch('/api/profile/image/', {
				method: 'POST',
	            headers: {
	                'Authorization': 'Bearer ' + this.state.acs_token,
	            },
	            body: data,
			})
			.then(response => response.json())
			.then(data => {
				this.props.setImage({
					profile_image: data.profile_image,
				})
			})
			.catch((error) => {
	            console.error("Something went wrong.")
	        });
		})
	}

  	render() {
  		const minSize = 0;
  		const maxSize = 5242880;

  		return (
  			<div className="Dropzone">
				<Dropzone 
					multiple={ false }
					accept={ "image/*" } 
					minSize={ minSize }
  					maxSize={ maxSize }
					onDrop={ acceptedFiles => this.onDrop(acceptedFiles) } >
					{({
						getRootProps, 
						getInputProps, 
						isDragActive, 
						isDragReject,
						acceptedFiles
					}) => (
						<div className="dropzone-input" {...getRootProps()}>
							<input className="dropzone-input" {...getInputProps()} />
							<p>
								{!isDragActive && 'Drop file here'}
							    {isDragActive && !isDragReject && 'Upload file'}
							</p>
							<div>
							    {
							    	isDragReject && 
							    	<div className="text-danger mt-2">
										<p>Unsupported file</p>
									</div>
							    }
							</div>
						</div>
					)}
				</Dropzone>
			</div>
		)
	}
}

export default connect(null, { setImage })(DropzoneComponent);