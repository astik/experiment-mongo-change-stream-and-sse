import { AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
	appTitle: {
		fontSize: '200%'
	}
});

export const AppBar = () => {
	const classes = useStyles();
	return (
		<MuiAppBar position="sticky" color="inherit">
			<Toolbar>
				<Typography variant="h1" color="inherit" className={classes.appTitle}>
					POC Realtime synchronisation
				</Typography>
			</Toolbar>
		</MuiAppBar>
	);
};
