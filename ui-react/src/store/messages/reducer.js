import {
	MESSAGES_REQUESTED,
	MESSAGES_RECEIVED,
	MESSAGES_SOURCE_INITIALIZED,
	MESSAGES_NEW_POSTED,
	MESSAGES_NEW_ADDED
} from './actions';

const virginState = {
	initializing: false,
	messages: [],
	messageSource: undefined,
	newPosting: false
};

const MAX_MESSAGES = 5;

const reducer = (state = { ...virginState }, action) => {
	switch (action.type) {
		case MESSAGES_REQUESTED:
			return {
				...state,
				initializing: true
			};
		case MESSAGES_RECEIVED:
			const messages = [...state.messages, ...action.messages.reverse()].slice(
				-1 * MAX_MESSAGES
			);
			return {
				...state,
				initializing: false,
				messages
			};
		case MESSAGES_SOURCE_INITIALIZED:
			return {
				...state,
				messageSource: action.messageSource
			};
		case MESSAGES_NEW_POSTED:
			return {
				...state,
				newPosting: true
			};
		case MESSAGES_NEW_ADDED:
			return {
				...state,
				newPosting: false
			};
		default:
			return state;
	}
};

export default reducer;

// selectors
export const isInitializing = state => state.initializing;
export const getMessages = state => state.messages;
export const isNewPosting = state => state.newPosting;
