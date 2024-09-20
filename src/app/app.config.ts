import {
  APP_INITIALIZER,
  ApplicationConfig,
  Injectable,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import {
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import { provideAuth, StsConfigLoader } from 'angular-auth-oidc-client';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { authConfigProviderFactory } from './core/auth/auth.config';
import { firstValueFrom, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private config?: AppConfig;

  constructor(private http: HttpClient) {}

  async loadAppConfig(): Promise<void> {
    return environment.production
      ? firstValueFrom(
          this.http.get('/config').pipe(
            tap((config: any) => {
              this.config = {
                redirectUrl: config['SPA_REDIRECT_URL'],
                postLogoutRedirectUri: config['SPA_POST_LOGOUT_REDIRECT_URI'],
                silentRenewUrl: config['SPA_SILENT_RENEW_URL'],
                serviceUrl: config['SPA_SERVICE_URL'],
                authority: config['SPA_AUTHORITY'],
              };
            })
          )
        )
      : (this.config = environment);
  }

  getConfig(): AppConfig {
    if (!this.config) {
      throw new Error('Configuration has not been loaded.');
    }
    return this.config;
  }
}

export type AppConfig = {
  redirectUrl: string;
  postLogoutRedirectUri: string;
  silentRenewUrl: string;
  serviceUrl: string;
  authority: string;
};

export function initializeApp(config: AppConfigService) {
  return (): Promise<void> =>
    config
      .loadAppConfig()
      .then((config) => console.log('AppConfig loaded', config));
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AppConfigService],
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideClientHydration(
      withHttpTransferCacheOptions({ includePostRequests: true })
    ),
    provideAuth({
      loader: {
        provide: StsConfigLoader,
        useFactory: authConfigProviderFactory,
        deps: [AppConfigService],
      },
    }),
    provideHttpClient(),
  ],
};
