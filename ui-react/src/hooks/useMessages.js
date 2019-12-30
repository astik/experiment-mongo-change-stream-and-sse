import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	isMessagesInitializing as isMessagesInitializingSelector,
	getMessages as getMessagesSelector,
	initMessages as initMessagesDispatch
} from '../store';

export const useMessages = () => {
	const isMessagesInitializing = useSelector(isMessagesInitializingSelector);
	const messages = useSelector(getMessagesSelector);
	const dispatch = useDispatch();
	const initMessages = useCallback(() => dispatch(initMessagesDispatch()), [
		dispatch
	]);
	return { isMessagesInitializing, messages, initMessages };
};
