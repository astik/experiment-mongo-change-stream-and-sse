import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { configureStore as configureReduxStore } from '../../store';
import { AppBar } from '../AppBar';
import { Loader } from '../Loader';
import { AuthenticatedApp } from './AuthenticatedApp';
import { UnauthenticatedApp } from './UnauthenticatedApp';

const useStyles = makeStyles({
	pageContainer: {
		width: '800px',
		margin: '20px auto'
	}
});

const RawApp = () => {
	const classes = useStyles();
	const { isAuthenticating, isAuthenticated } = useAuth();
	return (
		<>
			<AppBar />
			<div className={classes.pageContainer}>
				{isAuthenticating ? (
					<Loader />
				) : isAuthenticated ? (
					<AuthenticatedApp />
				) : (
					<UnauthenticatedApp />
				)}
			</div>
		</>
	);
};

export const App = () => (
	<ReduxProvider store={configureReduxStore()}>
		<RawApp />
	</ReduxProvider>
);
