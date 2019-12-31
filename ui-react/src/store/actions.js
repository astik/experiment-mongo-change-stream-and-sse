import * as authService from '../services/auth';
import * as messagesService from '../services/messages';
import * as authenticationAction from './authentication/actions';
import * as messagesAction from './messages/actions';

export const login = username => dispatch => {
	dispatch(authenticationAction.loginRequested(username));
	authService.login(username).then(() => {
		dispatch(authenticationAction.loginSuccess());
	});
};

export const logout = () => (dispatch, getState) => {
	dispatch(authenticationAction.logoutRequested());
	authService.logout().then(() => {
		dispatch(authenticationAction.logoutSuccess());
	});
	const messageSource = getState().messages.messageSource;
	if (!!messageSource) {
		messageSource.close();
		dispatch(messagesAction.messagesSourceInitialized());
	}
};

export const initMessages = () => dispatch => {
	dispatch(messagesAction.messagesRequested());
	const eventSource = messagesService.getMessages(messages => {
		dispatch(messagesAction.messagesReceived(messages));
	});
	dispatch(messagesAction.messagesSourceInitialized(eventSource));
};

export const postNewMessage = newMessage => (dispatch, getState) => {
	dispatch(messagesAction.newMessagePosted(newMessage));
	messagesService.postNewMessage(newMessage).then(() => {
		dispatch(messagesAction.newMessageAdded());
	});
};
