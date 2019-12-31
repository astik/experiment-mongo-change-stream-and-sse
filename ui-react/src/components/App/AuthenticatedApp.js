import React, { useEffect, useState } from 'react';
import { useMessages } from '../../hooks';
import { Loader } from '../Loader';
import {
	List,
	ListItem,
	ListItemText,
	TextField,
	Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	form: {
		display: 'flex',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	textfield: {
		flex: 1,
		marginRight: theme.spacing(2)
	}
}));

export const AuthenticatedApp = () => {
	const classes = useStyles();
	const {
		isMessagesInitializing,
		messages,
		initMessages,
		postNewMessage,
		isNewMessagePosting
	} = useMessages();
	useEffect(() => {
		initMessages();
	}, [initMessages]);
	const [newMessage, setNewMessage] = useState('');
	const handleNewMessage = event => {
		event.preventDefault();
		postNewMessage(newMessage);
		setNewMessage('');
	};
	if (isMessagesInitializing) {
		return <Loader />;
	}
	return (
		<div>
			<List>
				{messages.map(message => (
					<ListItem key={message._id}>
						<ListItemText
							primary={`${message.user} - ${message.date.toLocaleDateString(
								'en-GB',
								{
									weekday: 'long',
									year: 'numeric',
									month: 'long',
									day: 'numeric',
									hour: 'numeric',
									minute: 'numeric'
								}
							)}`}
							secondary={message.message}
						/>
					</ListItem>
				))}
			</List>
			<form onSubmit={handleNewMessage} className={classes.form}>
				<TextField
					label="New message"
					required
					onChange={event => setNewMessage(event.target.value)}
					value={newMessage}
					className={classes.textfield}
				/>
				<Button
					variant="contained"
					type="submit"
					color="primary"
					disabled={isNewMessagePosting}
				>
					Send new message
				</Button>
			</form>
		</div>
	);
};
