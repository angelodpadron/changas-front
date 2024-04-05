import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'changa-details/:id',
    loadComponent: () => import('./pages/changa-details/changa-details.page').then( m => m.ChangaDetailsPage)
  },


];
