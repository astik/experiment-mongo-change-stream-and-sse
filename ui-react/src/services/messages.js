import { post, getEventSource } from './api';

// get /messages SSE
export const getMessages = handleNewMessage => {
	console.log('getMessages');
	const eventSource = getEventSource('/messages');
	eventSource.onmessage = event => {
		const parsedData = JSON.parse(event.data).map(message => {
			message.date = new Date(message.date);
			return message;
		});
		console.log('retrieve new message', parsedData);
		handleNewMessage(parsedData);
	};
	return eventSource;
};

export const postNewMessage = newMessage => {
	console.log('postNewMessage');
	return post('/messages', { newMessage });
};
