import React, { Component } from 'react';
import Body from '../component/Body.js'

import store from '../../../store';

class BodyContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedPanel: 'profile'
		}

		store.subscribe(() => {
			this.setState({
				selectedPanel: store.getState().adminPanelSelection.panelSelection
			})
		})
	}

	render() {
		const { selectedPanel } = this.state;
		return (
			<Body selectedPanel = { selectedPanel } />
		)
	}
}

export default BodyContainer;