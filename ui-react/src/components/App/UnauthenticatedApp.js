import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useAuth } from '../../hooks';

const useStyles = makeStyles(theme => ({
	card: {
		width: '400px',
		margin: 'auto'
	},
	cardHeaderStylePref: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText
	}
}));

export const UnauthenticatedApp = () => {
	const { login } = useAuth();
	const classes = useStyles();
	const [username, setUsername] = useState('');
	const handleSubmit = event => {
		event.preventDefault();
		login(username);
	};
	return (
		<form onSubmit={handleSubmit}>
			<Card className={classes.card} variant="outlined">
				<CardHeader
					title="Connect to system ..."
					classes={{ root: classes.cardHeaderStylePref }}
				/>
				<CardContent>
					<TextField
						label="Username"
						required
						onChange={event => setUsername(event.target.value)}
						value={username}
						fullWidth={true}
					/>
				</CardContent>
				<CardActions>
					<Button variant="contained" type="submit" color="primary">
						Login
					</Button>
				</CardActions>
			</Card>
		</form>
	);
};
