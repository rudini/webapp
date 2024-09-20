import { StsConfigStaticLoader } from 'angular-auth-oidc-client';
import { AppConfigService } from '../../app.config';

export const authConfigProviderFactory = (
  appConfigService: AppConfigService
) => {
  const appConfig = appConfigService.getConfig();
  return new StsConfigStaticLoader({
    authority: appConfig.authority,
    redirectUrl: appConfig.redirectUrl,
    postLogoutRedirectUri: appConfig.postLogoutRedirectUri,
    clientId: 'spa-blog',
    scope: 'openid profile email offline_access blogs', // 'openid profile ' + your scopes
    responseType: 'code',
    silentRenew: true,
    silentRenewUrl: appConfig.silentRenewUrl,
    renewTimeBeforeTokenExpiresInSeconds: 10,
  });
};
