import { Routes } from '@angular/router';
import { loginRequiredGuard } from './core/guards/login-required.guard';
import { isNotAuthenticatedGuard } from './core/guards/is-not-authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'changa-details/:id',
    loadComponent: () =>
      import('./pages/changa-details/changa-details.page').then(
        (m) => m.ChangaDetailsPage
      ),
  },
  {
    path: 'login',
    canActivate: [isNotAuthenticatedGuard],
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'signup',
    canActivate: [isNotAuthenticatedGuard],
    loadComponent: () =>
      import('./pages/signup/signup.page').then((m) => m.SignupPage),
  },
  {
    path: 'hiring-success',
    canActivate: [loginRequiredGuard],
    loadComponent: () =>
      import('./pages/hiring-success/hiring-success.page').then(
        (m) => m.HiringSuccessPage
      ),
  },
  {
    path: 'hirings',
    canActivate: [loginRequiredGuard],
    loadComponent: () =>
      import('./pages/hirings/hirings.page').then((m) => m.HiringsPage),
  },
];
