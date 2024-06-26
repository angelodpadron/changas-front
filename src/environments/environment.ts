// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseApiUrl: 'localhost:8080',
  fullApiUrl: 'http://localhost:8080/api/v1',
  tokenKey: 'accessToken',
  geoapifyApiKey: '66669d8edbc445abbc4e1afd99c4b201',
  geoapifyUrl: 'https://api.geoapify.com/v1/geocode/autocomplete',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
