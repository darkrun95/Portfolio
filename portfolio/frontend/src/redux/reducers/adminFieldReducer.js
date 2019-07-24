import { SET_EDUCATION, SET_EXPERIENCE } from '../actions/types';

const initialState = {
	education_id: undefined,
	experience_id: undefined,
}

export default function(state = initialState, action) {
	switch(action.type) {
		case SET_EDUCATION:
			return {
				...state,
				education_id: action.payload.education_id,
			}
		case SET_EXPERIENCE: 
			return {
				...state,
				experience_id: action.payload.experience_id,
			}
		default:
			return state;
	}
}