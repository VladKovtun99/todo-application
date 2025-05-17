import { Routes } from '@angular/router';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {HomeComponent} from './components/home/home.component';
import {authLoginGuard} from './guards/auth-login.guard';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {NotFoundComponent} from './components/not-found/not-found.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent, canActivate: [authLoginGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [authLoginGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [authLoginGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [authLoginGuard] },
  { path: '**', component: NotFoundComponent }
];
