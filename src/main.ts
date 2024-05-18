import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

if (environment.production) {
  enableProdMode();
}

export function tokenGetter() {
  return localStorage.getItem(environment.tokenKey);
}

export function jwtProviderConfig() {
  const baseApiUrl = 'localhost:8080';
  const fullApiUrl = `http://${baseApiUrl}/api/v1`;

  return JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      allowedDomains: [baseApiUrl],
      disallowedRoutes: [
        `${fullApiUrl}/changas`,
        new RegExp(`${fullApiUrl}/changas/\\d+$`),
        new RegExp(`${fullApiUrl}/changas/findBy.*`),
        new RegExp(`${fullApiUrl}/auth/.*`),
        // new RegExp(`${fullApiUrl}/customers/\\d+$`),
      ],
    },
  });
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(jwtProviderConfig()),
    provideHttpClient(withInterceptorsFromDi()),
  ],
});
