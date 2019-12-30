import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore as configureReduxStore } from '../../store';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../Loader';
import { AuthenticatedApp } from './AuthenticatedApp';
import { UnauthenticatedApp } from './UnauthenticatedApp';

const RawApp = () => {
	const { isAuthenticating, isAuthenticated } = useAuth();
	if (isAuthenticating) {
		return <Loader />;
	}
	if (isAuthenticated) {
		return <AuthenticatedApp />;
	}
	return <UnauthenticatedApp />;
};

export const App = () => (
	<ReduxProvider store={configureReduxStore()}>
		<RawApp />
	</ReduxProvider>
);
