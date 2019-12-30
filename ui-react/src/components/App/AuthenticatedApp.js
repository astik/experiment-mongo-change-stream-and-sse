import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export const AuthenticatedApp = () => {
	const { logout, userName } = useAuth();
	return (
		<>
			<div>Authenticated {userName}</div>
			<button onClick={() => logout()}>LOGOUT</button>
		</>
	);
};
