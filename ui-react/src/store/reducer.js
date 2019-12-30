import { combineReducers } from 'redux';
import authenticationReducer, * as authentication from './authentication/reducer';
import messagesReducer, * as messages from './messages/reducer';

export default combineReducers({
	authentication: authenticationReducer,
	messages: messagesReducer
});

// selectors
export const isAuthenticating = state =>
	authentication.isAuthenticating(state.authentication);
export const isAuthenticated = state =>
	authentication.isAuthenticated(state.authentication);
export const getUserName = state =>
	authentication.getUserName(state.authentication);
export const isMessagesInitializing = state =>
	messages.isInitializing(state.messages);
export const getMessages = state => messages.getMessages(state.messages);
