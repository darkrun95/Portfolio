import { SET_PANEL } from '../actions/types';

const initialState = {
	panelSelection: undefined,
}

export default function(state = initialState, action) {
	switch(action.type) {
		case SET_PANEL:
			return {
				...state,
				panelSelection: action.payload
			}
		default:
			return state;
	}
}