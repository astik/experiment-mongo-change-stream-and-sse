import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
	let initialState = {};
	if (process.env.NODE_ENV === 'development') {
		initialState = localStorage.getItem('state') || undefined;
		if (!!initialState) {
			initialState = JSON.parse(initialState);
		}
	}
	const store = createStore(
		rootReducer,
		initialState,
		composeEnhancers(applyMiddleware(thunk))
	);
	return store;
};

export * from './actions';
export {
	isAuthenticating,
	isAuthenticated,
	getUserName,
	isMessagesInitializing,
	getMessages,
	isNewMessagePosting
} from './reducer';
