import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	isMessagesInitializing as isMessagesInitializingSelector,
	getMessages as getMessagesSelector,
	isNewMessagePosting as isNewMessagePostingSelector,
	initMessages as initMessagesDispatch,
	postNewMessage as postNewMessageDispatch
} from '../store';

export const useMessages = () => {
	const isMessagesInitializing = useSelector(isMessagesInitializingSelector);
	const messages = useSelector(getMessagesSelector);
	const isNewMessagePosting = useSelector(isNewMessagePostingSelector);
	const dispatch = useDispatch();
	const initMessages = useCallback(() => dispatch(initMessagesDispatch()), [
		dispatch
	]);
	const postNewMessage = useCallback(
		newMessage => dispatch(postNewMessageDispatch(newMessage)),
		[dispatch]
	);
	return {
		isMessagesInitializing,
		messages,
		initMessages,
		postNewMessage,
		isNewMessagePosting
	};
};
