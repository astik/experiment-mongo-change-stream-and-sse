import { get } from './api';

// get /messages
export const getMessages = () => {
	console.log('getMessages');
	return get('/messages').then(messages =>
		messages.map(message => {
			message.date = new Date(message.date);
			return message;
		})
	);
};
