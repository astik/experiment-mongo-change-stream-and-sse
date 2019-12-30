import {
	MESSAGES_REQUESTED,
	MESSAGES_RECEIVED,
	MESSAGES_REFRESHER_INITIALIZED
} from './actions';

const virginState = {
	initializing: false,
	messages: [],
	refresherId: undefined
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
		case MESSAGES_REFRESHER_INITIALIZED:
			return {
				...state,
				refresherId: action.refresherId
			};
		default:
			return state;
	}
};

export default reducer;

// selectors
export const isInitializing = state => state.initializing;
export const getMessages = state => state.messages;
