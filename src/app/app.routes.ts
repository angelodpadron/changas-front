import { Routes } from '@angular/router';

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
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },  {
    path: 'hiring-success',
    loadComponent: () => import('./pages/hiring-success/hiring-success.page').then( m => m.HiringSuccessPage)
  },

];
