import { Routes } from '@angular/router';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {authLoginGuard} from './guards/auth-login.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent, canActivate: [authLoginGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [authLoginGuard] },
];
