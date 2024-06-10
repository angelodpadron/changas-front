import { CapacitorConfig } from '@capacitor/cli';
import { environment } from 'src/environments/environment';

const config: CapacitorConfig = {
  appId: 'ionic.changas',
  appName: 'changas',
  webDir: 'www/browser',
  server: {
    androidScheme: "http",
    cleartext: true,
    allowNavigation: [
      environment.fullApiUrl + "/*"
    ]
  }
};

export default config;
