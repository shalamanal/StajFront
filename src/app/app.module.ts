import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UserService} from "./Service/user.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { UserAppComponent } from './user-app/user-app.component';
import { StateAppComponent } from './state-app/state-app.component';
import { ServiceAppComponent } from './service-app/service-app.component';
import { MachineryAppComponent } from './machinery-app/machinery-app.component';
import { OrderAppComponent } from './order-app/order-app.component';
import { LoginAppComponent } from './login-app/login-app.component';
import {httpInterceptorProviders} from "./auth/auth-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    UserAppComponent,
    StateAppComponent,
    ServiceAppComponent,
    MachineryAppComponent,
    OrderAppComponent,
    LoginAppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService , httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
