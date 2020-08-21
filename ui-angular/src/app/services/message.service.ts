import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Message } from '../models';

const API_BASE_URL = '/api';
const MAX_MESSAGE = 10;

@Injectable({
	providedIn: 'root',
})
export class MessageService {
	private messagesSubject = new ReplaySubject<Message>(MAX_MESSAGE);
	private readonly messages$: Observable<Message>;
	private eventSource: EventSource;

	constructor(private http: HttpClient, private zone: NgZone) {
		this.messages$ = this.messagesSubject.pipe(shareReplay(MAX_MESSAGE));
	}

	getMessages() {
		return this.messages$;
	}

	startGettingMessage() {
		console.log('[MessageService] start getting new message');
		if (!this.eventSource) {
			console.log('[MessageService] init event source');
			this.eventSource = new EventSource(`${API_BASE_URL}/messages`);
			this.eventSource.onmessage = (event) => {
				const parsedMessageList = JSON.parse(event.data).map((message) => {
					message.date = new Date(message.date);
					return message;
				});
				console.log('[MessageService] retrieve new message', parsedMessageList);
				this.zone.run(() =>
					parsedMessageList.forEach((message) => {
						this.messagesSubject.next(message);
					})
				);
			};
		}
	}

	stopGettingMessage() {
		console.log('[MessageService] stop getting new message');
		if (!!this.eventSource) {
			this.eventSource.close();
		}
	}

	postNewMessage(newMessage) {
		console.log('[MessageService] post new message', newMessage);
		return this.http.post(`${API_BASE_URL}/messages`, { newMessage });
	}
}
