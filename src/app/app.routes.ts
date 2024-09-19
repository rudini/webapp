
import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/auth/is-authenticated.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'secure-route',
    loadChildren: () => import('./features/secure-route-page/secure-route-page.routing'),
    canActivate: [isAuthenticatedGuard],
  }
];
