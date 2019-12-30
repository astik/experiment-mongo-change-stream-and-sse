import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	isAuthenticating as isAuthenticatingSelector,
	isAuthenticated as isAuthenticatedSelector,
	getUserName as getUserNameSelector,
	login as loginDispatch,
	logout as logoutDispatch
} from '../store';

export const useAuth = () => {
	const isAuthenticating = useSelector(isAuthenticatingSelector);
	const isAuthenticated = useSelector(isAuthenticatedSelector);
	const userName = useSelector(getUserNameSelector);
	const dispatch = useDispatch();
	const login = useCallback(username => dispatch(loginDispatch(username)), [
		dispatch
	]);
	const logout = useCallback(() => dispatch(logoutDispatch()), [dispatch]);
	return { isAuthenticating, isAuthenticated, userName, login, logout };
};
