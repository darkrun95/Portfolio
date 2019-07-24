import { SET_EDUCATION } from '../actions/types';

const initialState = {
	education_id: undefined,
}

export default function(state = initialState, action) {
	switch(action.type) {
		case SET_EDUCATION:
			return {
				...state,
				education_id: action.payload.education_id,
			}
		default:
			return state;
	}
}