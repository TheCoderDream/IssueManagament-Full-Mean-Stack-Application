import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { NgxLoadingModule  } from 'ngx-loading';

import { AppComponent } from './app.component';
import {LoginComponent} from "./components/login/login.component";
import {HeaderComponent} from "./components/header/header.component";
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import {SignupComponent} from "./components/signup/signup.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { IssueCreateComponent } from './components/issue-create/issue-create.component';
import { FooterComponent } from './components/footer/footer.component';
import {routes} from "./app.routing";
import {TokenInterceptorService} from "./services/token-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    DefaultLayoutComponent,
    PageNotFoundComponent,
    IssueListComponent,
    IssueCreateComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AlertModule.forRoot(),
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
