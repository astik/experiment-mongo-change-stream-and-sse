import {
	LOGIN_REQUESTED,
	LOGOUT_REQUESTED,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS
} from './actions';

const virginState = {
	authenticating: false,
	login: undefined
};

const reducer = (state = { ...virginState }, action) => {
	switch (action.type) {
		case LOGIN_REQUESTED:
			return {
				...state,
				authenticating: true,
				login: action.login
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				authenticating: false
			};
		case LOGOUT_REQUESTED:
			return {
				...state,
				authenticating: true,
				login: undefined
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				authenticating: false,
				login: undefined
			};
		default:
			return state;
	}
};

export default reducer;

// selectors
export const isAuthenticating = state => state.authenticating;
export const isAuthenticated = state => !!state.login;
export const getUserName = state => state.login;
