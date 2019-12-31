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
	const messageRefresherId = getState().messages.refresherId;
	if (!!messageRefresherId) {
		clearInterval(messageRefresherId);
		dispatch(messagesAction.messagesRefresherInitialized());
	}
};

export const initMessages = () => dispatch => {
	dispatch(messagesAction.messagesRequested());
	messagesService.getMessages().then(messages => {
		dispatch(messagesAction.messagesReceived(messages));
		// TODO manage with SSE instead of mocked interval
		const refresherId = setInterval(() => {
			dispatch(
				messagesAction.messagesReceived([
					{
						_id: new Date().getTime(),
						date: new Date(),
						message: `new message ${new Date()}`,
						user: 'mock'
					}
				])
			);
		}, 3000);
		dispatch(messagesAction.messagesRefresherInitialized(refresherId));
	});
};

export const postNewMessage = newMessage => (dispatch, getState) => {
	dispatch(messagesAction.newMessagePosted(newMessage));
	messagesService.postNewMessage(newMessage).then(() => {
		const login = getState().authentication.login;
		// TODO remove this explicit dispatch after switching to SSE
		dispatch(
			messagesAction.messagesReceived([
				{
					_id: new Date().getTime(),
					date: new Date(),
					message: newMessage,
					user: login
				}
			])
		);
		dispatch(messagesAction.newMessageAdded());
	});
};
