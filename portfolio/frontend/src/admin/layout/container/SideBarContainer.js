import React, { Component } from 'react';
import { connect } from 'react-redux';

import SideBar from '../component/SideBar';
import { setPanel } from '../../../redux/actions/panelActions';
import store from '../../../store';
import { _ } from 'underscore';

class SideBarContainer extends Component {
	constructor(props) {
		super(props);
		this.changeSelectedElement = this.changeSelectedElement.bind(this);

		this.state = {
			selectedElement: undefined,
			profile_image: props.profile_image,
		}

		store.subscribe(() => {
			const { profile_image } = store.getState().adminPanelSelection
			if (profile_image !== undefined) {
				this.setState({
					profile_image: profile_image,
				})
			}
		})
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

	componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)){
            this.setState({
                profile_image: this.props.profile_image,
            })
        }
    }

	render() {
		const { profile_image } = this.state;
		return (
			<div className="inintoku-admin-sidebar">
			{
				profile_image === undefined ? "" :
				<SideBar 
					profile_image = { profile_image }
					handleChangeSelection={this.changeSelectedElement} />
			}
			</div>
		)
	}
}

export default connect(null, { setPanel })(SideBarContainer);