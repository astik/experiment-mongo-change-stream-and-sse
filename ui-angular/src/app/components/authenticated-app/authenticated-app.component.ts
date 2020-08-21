import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { Message } from 'src/app/models';
import { MessageService } from 'src/app/services';

@Component({
	selector: 'app-authenticated-app',
	templateUrl: './authenticated-app.component.html',
	styleUrls: ['./authenticated-app.component.css'],
})
export class AuthenticatedAppComponent {
	message: string;
	messages$: Observable<Message[]>;

	constructor(private messageService: MessageService) {
		this.messages$ = messageService.getMessages().pipe(
			scan((accu, value) => {
				accu.push(value);
				return accu.slice(-5);
			}, [])
		);
	}

	newMessage(message) {
		this.messageService.postNewMessage(message).subscribe(() => {
			this.message = '';
		});
	}
}
