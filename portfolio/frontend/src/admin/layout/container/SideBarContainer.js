import React, { Component } from 'react';
import { connect } from 'react-redux';

import SideBar from '../component/SideBar';
import { setPanel } from '../../../redux/actions/panelActions';

class SideBarContainer extends Component {
	constructor(props) {
		super(props);
		this.changeSelectedElement = this.changeSelectedElement.bind(this);

		this.state = {
			selectedElement: undefined,
		}
	}

	changeSelectedElement(newState) {
		this.setState({
			selectedElement: newState,
		}, () => {
			this.props.setPanel({
				selectedElement: this.state.selectedElement, 
				changePanel: true
			})
		})
	}

	render() {
		return (
			<SideBar 
				handleChangeSelection={this.changeSelectedElement} />
		)
	}
}

export default connect(null, { setPanel })(SideBarContainer);