import { ApplicationConfig, inject, InjectionToken, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { authConfigProviderFactory } from './auth/auth.config';
import { provideAuth, StsConfigLoader } from 'angular-auth-oidc-client';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withHttpTransferCacheOptions({ includePostRequests: true })),
    provideAuth({
      loader: {
        provide: StsConfigLoader,
        useFactory: authConfigProviderFactory,
      },
    }),
    provideHttpClient(),
  ],
};
