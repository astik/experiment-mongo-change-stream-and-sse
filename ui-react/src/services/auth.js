import { post } from './api';

// POST /login
export const login = login => {
	console.log(`login - login=${login}`);
	return post('/login', { login });
};

// POST /logout
export const logout = () => {
	console.log('logout');
	return post('/logout');
};
