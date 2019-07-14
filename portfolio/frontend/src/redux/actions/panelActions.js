import { SET_PANEL } from './types';

export function setPanel(panelSelection) {
	return function(dispatch) {
		dispatch({
			type: SET_PANEL,
			payload: panelSelection
		})
	}
}