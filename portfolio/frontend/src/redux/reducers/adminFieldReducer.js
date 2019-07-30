import { 
	SET_EDUCATION, 
	SET_EXPERIENCE, 
	SET_VOLUNTEER,
	SET_PROJECT,
} from './types';

const initialState = {
	education_id: undefined,
	experience_id: undefined,
	volunteering_id: undefined,
	project_id: undefined,
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
		case SET_VOLUNTEER:
			return {
				...state,
				volunteering_id: action.payload.volunteering_id,
			}
		case SET_PROJECT:
			return {
				...state,
				project_id: action.payload.project_id,
			}
		default:
			return state;
	}
}