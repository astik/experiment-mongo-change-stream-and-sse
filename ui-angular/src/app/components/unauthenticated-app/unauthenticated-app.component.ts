import { Component } from '@angular/core';
import { AuthService } from '../../services';

@Component({
	selector: 'app-unauthenticated-app',
	templateUrl: './unauthenticated-app.component.html',
	styleUrls: ['./unauthenticated-app.component.css'],
})
export class UnauthenticatedAppComponent {
	username: string;
	loading = false;

	constructor(private authService: AuthService) {}

	login = (username) => {
		this.loading = true;
		this.authService.login(username).subscribe(() => {
			this.loading = false;
		});
	};
}
