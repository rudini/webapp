import { inject, PLATFORM_ID } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { isPlatformBrowser } from '@angular/common';


function parseJwt(token?: string) {
  if (!token) {
    return {};
  }

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  console.log(JSON.parse(jsonPayload));
  return JSON.parse(jsonPayload);
}

export function hasRole(role: string, token?: string) {
  const jwtToken = parseJwt(token);
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

  if (
    loginResponse.isAuthenticated &&
    loginResponse.accessToken &&
    hasRole('user', loginResponse.accessToken)
  ) {
    return true;
  } else {
    if (isPlatformBrowser(platformId)) {
      authService.authorize();
    }
    return false;
  }
};
