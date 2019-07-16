import { SET_PANEL, SET_IMAGE } from '../actions/types';

const initialState = {
	panelSelection: undefined,
	changePanel: undefined,
	profile_image: undefined,
}

export default function(state = initialState, action) {
	switch(action.type) {
		case SET_PANEL:
			return {
				...state,
				panelSelection: action.payload.selectedElement,
				changePanel: action.payload.changePanel,
			}
		case SET_IMAGE:
			return {
				...state,
				profile_image: action.payload.profile_image,
			}
		default:
			return state;
	}
}