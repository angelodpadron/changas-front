import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
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
  return localStorage.getItem('accessToken');
}

export function jwtProviderConfig() {
  const baseApiUrl = 'localhost:8080';

  return JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      allowedDomains: [`${baseApiUrl}`],
      disallowedRoutes: [
        `${baseApiUrl}/api/v1/auth/login`,
        `${baseApiUrl}/api/v1/auth/signup`,
        `${baseApiUrl}/api/v1/changas`,
        new RegExp(`${baseApiUrl}/api/v1/changas/\\d+$`), // la idea aca es no mandar el token para changas/{id}, ya que es un endpoint publico
      ],
    },
  });
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    importProvidersFrom(jwtProviderConfig()),
    provideHttpClient(withInterceptorsFromDi()),
  ],
});
