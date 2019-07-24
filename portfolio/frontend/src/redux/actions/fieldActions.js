import { SET_EDUCATION } from './types';

export function setEducation(education_id) {
	return function(dispatch) {
		dispatch({
			type: SET_EDUCATION,
			payload: education_id,
		})
	}
}