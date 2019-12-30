import {
	AppBar as MuiAppBar,
	Toolbar,
	Typography,
	Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useAuth } from '../../hooks';

const useStyles = makeStyles({
	appTitle: {
		fontSize: '200%',
		flex: 1
	},
	connectedAs: {
		marginRight: '10px'
	}
});

export const AppBar = () => {
	const classes = useStyles();
	const { userName, isAuthenticated, isAuthenticating, logout } = useAuth();
	return (
		<MuiAppBar position="sticky" color="inherit">
			<Toolbar>
				<Typography variant="h1" color="inherit" className={classes.appTitle}>
					POC Realtime synchronisation
				</Typography>
				{!isAuthenticating && isAuthenticated && (
					<>
						<div className={classes.connectedAs}>Connected as {userName}</div>
						<Button
							variant="contained"
							color="primary"
							onClick={() => logout()}
						>
							LOGOUT
						</Button>
					</>
				)}
			</Toolbar>
		</MuiAppBar>
	);
};
