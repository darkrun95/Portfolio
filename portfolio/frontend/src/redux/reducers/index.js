import { combineReducers } from 'redux';
import adminPanelReducer from './adminPanelReducer';

export default combineReducers({
	adminPanelSelection: adminPanelReducer
})