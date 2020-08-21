import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';

const API_BASE_URL = '/api';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private meSubject = new ReplaySubject<User>(1);
	private readonly me$: Observable<User>;

	constructor(private http: HttpClient) {
		this.meSubject.next(null);
		this.me$ = this.meSubject.pipe(shareReplay(1));
	}

	me(): Observable<User> {
		return this.me$;
	}

	login(username) {
		console.log('login', username);
		return this.http.post(`${API_BASE_URL}/login`, { login: username }).pipe(
			tap(() => {
				this.meSubject.next({ name: username });
			})
		);
	}

	logout() {
		console.log('logout');
		return this.http.post(`${API_BASE_URL}/logout`, {}).pipe(
			tap(() => {
				this.meSubject.next(null);
			})
		);
	}
}
