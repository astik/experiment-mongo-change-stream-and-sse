import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {
	AuthenticatedAppComponent,
	LoaderComponent,
	TopBarComponent,
	UnauthenticatedAppComponent,
} from './components';
import { IsAuthenticatedDirective } from './directives';

@NgModule({
	declarations: [
		AppComponent,
		LoaderComponent,
		TopBarComponent,
		AuthenticatedAppComponent,
		UnauthenticatedAppComponent,
		IsAuthenticatedDirective,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		MatToolbarModule,
		MatButtonModule,
		MatCardModule,
		MatInputModule,
		MatListModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
