export const MESSAGES_REQUESTED = 'MESSAGES_REQUESTED';
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const MESSAGES_REFRESHER_INITIALIZED = 'MESSAGES_REFRESHER_INITIALIZED';

export const messagesRequested = () => dispatch =>
	dispatch({
		type: MESSAGES_REQUESTED
	});

export const messagesReceived = messages => dispatch =>
	dispatch({
		type: MESSAGES_RECEIVED,
		messages
	});

export const messagesRefresherInitialized = refresherId => dispatch =>
	dispatch({
		type: MESSAGES_REFRESHER_INITIALIZED,
		refresherId
	});
