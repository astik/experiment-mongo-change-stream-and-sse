import { combineReducers } from 'redux';
import authenticationReducer, * as authentication from './authentication/reducer';

export default combineReducers({
	authentication: authenticationReducer
});

// selectors
export const isAuthenticating = state =>
	authentication.isAuthenticating(state.authentication);
export const isAuthenticated = state =>
	authentication.isAuthenticated(state.authentication);
export const getUserName = state =>
	authentication.getUserName(state.authentication);
