import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserAppComponent} from "./user-app/user-app.component";
import {StateAppComponent} from "./state-app/state-app.component";
import {ServiceAppComponent} from "./service-app/service-app.component";
import {MachineryAppComponent} from "./machinery-app/machinery-app.component";
import {OrderAppComponent} from "./order-app/order-app.component";
import {LoginAppComponent} from "./login-app/login-app.component";

const routes: Routes = [{
  path: 'users', component: UserAppComponent},
  {path: 'state', component: StateAppComponent},
  {path: 'service', component: ServiceAppComponent},
  {path: 'machinery', component: MachineryAppComponent},
  {path: 'order', component: OrderAppComponent},
  {path: 'login' , component: LoginAppComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
