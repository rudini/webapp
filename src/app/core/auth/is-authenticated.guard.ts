import { inject, PLATFORM_ID } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { isPlatformBrowser } from '@angular/common';

export function hasRole(role: string, jwtToken?: any) {
  return !!(
    jwtToken &&
    jwtToken.realm_access &&
    jwtToken.realm_access.roles.indexOf(role) >= 0
  );
}

export const isAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(OidcSecurityService);
  const platformId = inject(PLATFORM_ID);

  const loginResponse = toSignal(authService.checkAuth(), {
    initialValue: { isAuthenticated: false } as LoginResponse,
  })();

  const accessToken = toSignal(authService.getPayloadFromAccessToken(), { initialValue: '' })();

  if (
    loginResponse.isAuthenticated &&
    accessToken &&
    hasRole('user', accessToken)
  ) {
    return true;
  } else {
    if (isPlatformBrowser(platformId)) {
      authService.authorize();
    }
    return false;
  }
};
