import * as authentication from './authentication/actions';
import * as auth from '../services/auth';

export const login = username => dispatch => {
	dispatch(authentication.loginRequested(username));
	auth.login(username).then(() => {
		dispatch(authentication.loginSuccess());
	});
};

export const logout = () => dispatch => {
	dispatch(authentication.logoutRequested());
	auth.logout().then(() => {
		dispatch(authentication.logoutSuccess());
	});
};
