import React, { Component } from 'react';
import { connect } from 'react-redux';

import EducationUpdate from '../../component/education/EducationUpdate';
import { setPanel } from '../../../redux/actions/panelActions';

class EducationUpdateContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	redirect: false,
        	education_entry: undefined,
        }

        this.handleButton = this.handleButton.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    handleButton() {
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
				selectedElement: 'qualifications', 
				changePanel: true
			})
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <EducationUpdate 
            	handleButtonCallback={ this.handleButton } />
        );
    }
}

export default connect(null, { setPanel })(EducationUpdateContainer);