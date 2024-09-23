import { StsConfigStaticLoader } from 'angular-auth-oidc-client';
import { environment } from '../../../environments/environment';


export const authConfigProviderFactory = () => {
  return new StsConfigStaticLoader({
    authority: environment.authority,
    redirectUrl: environment.redirectUrl,
    postLogoutRedirectUri: environment.postLogoutRedirectUri,
    clientId: 'spa-blog',
    scope: 'openid profile email offline_access blogs', // 'openid profile ' + your scopes
    responseType: 'code',
    silentRenew: true,
    silentRenewUrl: environment.silentRenewUrl,
    renewTimeBeforeTokenExpiresInSeconds: 10,
  });
};
