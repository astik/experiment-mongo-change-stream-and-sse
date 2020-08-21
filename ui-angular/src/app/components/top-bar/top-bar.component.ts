import { Component } from '@angular/core';
import { AuthService } from 'src/app/services';
import { User } from 'src/app/models';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
	me$: Observable<User>;

	constructor(private authService: AuthService) {
		this.me$ = authService.me();
	}

	logout = () => {
		this.authService.logout().subscribe();
	};
}
