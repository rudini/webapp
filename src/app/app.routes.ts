
import { ResolveFn, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/auth/is-authenticated.guard';
import { lastValueFrom, tap } from 'rxjs';
import { BlogBackendService, Entries } from './core/services/blog-backend.service';
import { inject } from '@angular/core';

export const entriesResolver: ResolveFn<Entries> = async (route) => {
  const queryParams = route?.queryParams;
  const blogBackendService = inject(BlogBackendService);
  return await lastValueFrom(blogBackendService.getBlogPosts(queryParams).pipe(tap(console.log)));
};

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    loadChildren: () => import('./features/overview-page/overview-page.routing'),
    resolve: { model: entriesResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'secure-route',
    loadChildren: () => import('./features/secure-route-page/secure-route-page.routing'),
    canActivate: [isAuthenticatedGuard],
  }
];
