import { Routes } from '@angular/router';
import { loginRequiredGuard } from './core/guards/login-required.guard';
import { isNotAuthenticatedGuard } from './core/guards/is-not-authenticated.guard';
import { TabsComponent } from './shared/components/tabs/tabs.component';

export const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'search-results',
        loadComponent: () =>
          import('./pages/search-results/search-results.page').then(
            (m) => m.SearchResultsPage
          ),
      },
      {
        path: 'hirings',
        canActivate: [loginRequiredGuard],
        loadComponent: () =>
          import('./pages/hirings/hirings.page').then((m) => m.HiringsPage),
      },
      {
        path: 'notifications',
        canActivate: [loginRequiredGuard],
        loadComponent: () =>
          import('./pages/notifications/notifications.page').then(
            (m) => m.NotificationsPage
          ),
      },
      {
        path: 'profile',
        canActivate: [loginRequiredGuard],
        loadComponent: () =>
          import('./pages/profile/profile.page').then((m) => m.ProfilePage),
      },
    ],
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
    path: 'create-changa',
    canActivate: [loginRequiredGuard],
    loadComponent: () =>
      import('./pages/create-changa/create-changa.page').then(
        (m) => m.CreateChangaPage
      ),
  },
  {
    path: 'changa-details/:id',
    loadComponent: () =>
      import('./pages/changa-details/changa-details.page').then(
        (m) => m.ChangaDetailsPage
      ),
  },
  {
    path: 'edit-changa/:id',
    canActivate: [loginRequiredGuard],
    loadComponent: () =>
      import('./pages/edit-changa/edit-changa.page').then(
        (m) => m.EditChangaPage
      ),
  },
  {
    path: 'checkout/:id',
    canActivate: [loginRequiredGuard],
    loadComponent: () =>
      import('./pages/checkout/checkout.page').then((m) => m.CheckoutPage),
  },
  {
    path: 'success',
    canActivate: [loginRequiredGuard],
    loadComponent: () =>
      import('./pages/success/success.page').then(
        (m) => m.SuccessPage
      ),
  },
  {
    path: 'request-details/:id',
    canActivate: [loginRequiredGuard],
    loadComponent: () =>
      import('./pages/request-details/request-details.page').then(
        (m) => m.RequestDetailsPage
      ),
  },
  {
    path: 'edit-profile',
    loadComponent: () =>
      import('./pages/edit-profile/edit-profile.page').then(
        (m) => m.EditProfilePage
      ),
  },
  {
    path: 'answer-inquiry/:id',
    canActivate: [loginRequiredGuard],
    loadComponent: () => import('./pages/answer-inquiry/answer-inquiry.page').then( m => m.AnswerInquiryPage)
  },
  {
    path: 'profile/:customerId',
    canActivate: [loginRequiredGuard],
    loadComponent: () =>
      import('./pages/profile/profile.page').then((m) => m.ProfilePage),
  },

];
