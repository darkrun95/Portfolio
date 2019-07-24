import { SET_PANEL, SET_IMAGE } from './types';

export function setPanel(panelSelection) {
	return function(dispatch) {
		dispatch({
			type: SET_PANEL,
			payload: panelSelection
		})
	}
}

export function setImage(profile_image) {
	return function(dispatch) {
		dispatch({
			type: SET_IMAGE,
			payload: profile_image,
		})
	}
}

