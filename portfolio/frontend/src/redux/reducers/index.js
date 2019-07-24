import { combineReducers } from 'redux';
import adminPanelReducer from './adminPanelReducer';
import adminFieldReducer from './adminFieldReducer';

export default combineReducers({
	adminPanelSelection: adminPanelReducer,
	adminField: adminFieldReducer,
})