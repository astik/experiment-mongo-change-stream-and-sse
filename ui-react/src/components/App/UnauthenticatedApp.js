import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export const UnauthenticatedApp = () => {
	const { login } = useAuth();
	return (
		<>
			<div>UnauthenticatedApp</div>
			<button onClick={() => login('rogon')}>LOGIN</button>
		</>
	);
};
