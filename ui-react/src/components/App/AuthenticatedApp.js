import React, { useEffect } from 'react';
import { useMessages } from '../../hooks';
import { Loader } from '../Loader';
import { List, ListItem, ListItemText } from '@material-ui/core';

export const AuthenticatedApp = () => {
	const { isMessagesInitializing, messages, initMessages } = useMessages();
	useEffect(() => {
		initMessages();
	}, [initMessages]);
	if (isMessagesInitializing) {
		return <Loader />;
	}
	return (
		<div>
			<List>
				{messages.map(message => (
					<ListItem key={message._id}>
						<ListItemText
							primary={`${
								message.user
							} - ${message.date.toLocaleDateString('en-GB', {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}`}
							secondary={message.message}
						/>
					</ListItem>
				))}
			</List>
		</div>
	);
};
