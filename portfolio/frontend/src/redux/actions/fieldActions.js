import { SET_EDUCATION, SET_EXPERIENCE } from './types';

export function setEducation(education_id) {
	return function(dispatch) {
		dispatch({
			type: SET_EDUCATION,
			payload: education_id,
		})
	}
}

export function setExperience(experience_id) {
	return function(dispatch) {
		dispatch({
			type: SET_EXPERIENCE,
			payload: experience_id,
		})
	}
}