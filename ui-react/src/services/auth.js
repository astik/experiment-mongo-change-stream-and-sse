import { post } from './api';

// POST /auth/login
export const login = login => {
	console.log(`login - login=${login}`);
	return post('/api/login', { login });
};

// POST /auth/logout
export const logout = () => {
	console.log('logout');
	return post('/api/logout');
};
