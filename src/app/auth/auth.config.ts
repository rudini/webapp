import {
  StsConfigStaticLoader,
} from 'angular-auth-oidc-client';

export const authConfigProviderFactory = () => {
  const config = {
        authority:
          'https://d-cap-keyclaok.kindbay-711f60b2.westeurope.azurecontainerapps.io/realms/blog',
        redirectUrl: 'http://localhost:4200',
        postLogoutRedirectUri: 'http://localhost:4200',
        clientId: 'spa-blog',
        scope: 'openid profile email offline_access blogs', // 'openid profile ' + your scopes
        responseType: 'code',
        silentRenew: true,
        silentRenewUrl: 'http://localhost:4200/silent-renew.html',
        renewTimeBeforeTokenExpiresInSeconds: 10,
      };

  return new StsConfigStaticLoader(config);
};
