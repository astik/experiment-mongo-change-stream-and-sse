// Adapted from https://css-tricks.com/importance-javascript-abstractions-working-remote-data/
import queryString from 'query-string';
import {
	BadRequestException,
	FormatException,
	TechnicalException,
	UnauthorizedException
} from '../exceptions';

/**
 * Simple service for generating different HTTP codes. Useful for
 * testing how your own scripts deal with varying responses.
 */
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const handleTechnicalError = rejection => {
	console.log('handleTechnicalError', rejection);
	throw new TechnicalException(rejection);
};

/**
 * fetch() will only reject a promise if the user is offline,
 * or some unlikely networking error occurs, such a DNS lookup failure.
 * However, there is a simple `ok` flag that indicates
 * whether an HTTP response's status code is in the successful range.
 */
const handleBusinessError = res => {
	switch (res.status) {
		case 400:
			return res.json().then(({ errors }) => {
				throw new BadRequestException(errors);
			});
		case 401:
			throw new UnauthorizedException();
		default:
			return res.ok ? res : Promise.reject(res);
	}
};

/**
 * Check whether the content type is correct before you process it further.
 */
const handleContentType = response => {
	const contentType = response.headers.get('content-type');
	if (contentType && contentType.includes('application/json')) {
		return response.json();
	}
	throw new FormatException();
};

export const get = (endpoint, queryParams) => {
	return fetch(`${baseUrl}${endpoint}?${queryString.stringify(queryParams)}`, {
		method: 'GET',
		headers: new Headers({
			Accept: 'application/json'
		}),
		credentials: 'same-origin'
	})
		.then(handleBusinessError, handleTechnicalError)
		.then(handleContentType);
};

const basicPostOrPut = method => (endpoint, body) => {
	return fetch(`${baseUrl}${endpoint}`, {
		method: method,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
		credentials: 'same-origin'
	})
		.then(handleBusinessError, handleTechnicalError)
		.then(handleContentType);
};

export const post = basicPostOrPut('POST');

export const put = basicPostOrPut('PUT');

export const remove = endpoint => {
	return fetch(`${baseUrl}${endpoint}`, {
		method: 'DELETE',
		credentials: 'same-origin'
	})
		.then(handleBusinessError, handleTechnicalError)
		.then(handleContentType);
};
