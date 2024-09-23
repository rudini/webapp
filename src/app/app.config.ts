import {
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import {
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import { provideAuth, StsConfigLoader } from 'angular-auth-oidc-client';
import { provideHttpClient } from '@angular/common/http';
import { authConfigProviderFactory } from './core/auth/auth.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideClientHydration(
      withHttpTransferCacheOptions({ includePostRequests: true })
    ),
    provideAuth({
      loader: {
        provide: StsConfigLoader,
        useFactory: authConfigProviderFactory,
      },
    }),
    provideHttpClient(),
  ],
};
