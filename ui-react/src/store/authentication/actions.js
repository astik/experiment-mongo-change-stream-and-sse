export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginRequested = login => dispatch =>
	dispatch({
		type: LOGIN_REQUESTED,
		login
	});

export const loginSuccess = () => dispatch =>
	dispatch({
		type: LOGIN_SUCCESS
	});

export const LOGOUT_REQUESTED = 'LOGOUT_REQUESTED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const logoutRequested = () => dispatch =>
	dispatch({
		type: LOGOUT_REQUESTED
	});

export const logoutSuccess = () => dispatch =>
	dispatch({
		type: LOGOUT_SUCCESS
	});
