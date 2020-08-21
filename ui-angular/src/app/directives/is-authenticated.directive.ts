import {
	Directive,
	Input,
	OnInit,
	TemplateRef,
	ViewContainerRef,
	OnDestroy,
} from '@angular/core';
import { AuthService } from '../services';
import { User } from '../models';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

@Directive({
	selector: '[isAuthenticated]',
})
export class IsAuthenticatedDirective implements OnInit, OnDestroy {
	private needAuthentication = false;
	private destroy$: Subject<boolean> = new Subject<boolean>();
	private templateRefElse: TemplateRef<unknown>;

	constructor(
		private templateRef: TemplateRef<unknown>,
		private viewContainer: ViewContainerRef,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.authService
			.me()
			.pipe(
				takeUntil(this.destroy$),
				tap((me) => {
					if (
						(this.needAuthentication && me !== null) ||
						(!this.needAuthentication && me === null)
					) {
						this.viewContainer.clear();
						this.viewContainer.createEmbeddedView(this.templateRef);
					} else {
						this.viewContainer.clear();
						if (!!this.templateRefElse) {
							this.viewContainer.createEmbeddedView(this.templateRefElse);
						}
					}
				})
			)
			.subscribe();
	}

	ngOnDestroy() {
		this.destroy$.next(true);
		this.destroy$.complete();
	}

	@Input()
	set isAuthenticated(needAuthentication: boolean) {
		this.needAuthentication = needAuthentication;
	}

	@Input()
	set isAuthenticatedElse(templateRefElse: TemplateRef<unknown> | null) {
		this.templateRefElse = templateRefElse;
	}
}
