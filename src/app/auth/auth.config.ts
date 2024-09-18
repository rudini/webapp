import {
  StsConfigStaticLoader,
} from 'angular-auth-oidc-client';
import { environment } from '../../environments/environment.development';

export const authConfigProviderFactory = () => {
  const config = {
        authority:
          'https://d-cap-keyclaok.kindbay-711f60b2.westeurope.azurecontainerapps.io/realms/blog',
        redirectUrl: environment.redirectUrl,
        postLogoutRedirectUri: environment.postLogoutRedirectUri,
        clientId: 'spa-blog',
        scope: 'openid profile email offline_access blogs', // 'openid profile ' + your scopes
        responseType: 'code',
        silentRenew: true,
        silentRenewUrl: environment.silentRenewUrl,
        renewTimeBeforeTokenExpiresInSeconds: 10,
      };

  return new StsConfigStaticLoader(config);
};
