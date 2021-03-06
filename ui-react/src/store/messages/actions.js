export const MESSAGES_REQUESTED = 'MESSAGES_REQUESTED';
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const MESSAGES_SOURCE_INITIALIZED = 'MESSAGES_SOURCE_INITIALIZED';
export const MESSAGES_NEW_POSTED = 'MESSAGES_NEW_POSTED';
export const MESSAGES_NEW_ADDED = 'MESSAGES_NEW_ADDED';

export const messagesRequested = () => dispatch =>
	dispatch({
		type: MESSAGES_REQUESTED
	});

export const messagesReceived = messages => dispatch =>
	dispatch({
		type: MESSAGES_RECEIVED,
		messages
	});

export const messagesSourceInitialized = messageSource => dispatch =>
	dispatch({
		type: MESSAGES_SOURCE_INITIALIZED,
		messageSource
	});

export const newMessagePosted = message => dispatch =>
	dispatch({
		type: MESSAGES_NEW_POSTED,
		message
	});

export const newMessageAdded = () => dispatch =>
	dispatch({
		type: MESSAGES_NEW_ADDED
	});
