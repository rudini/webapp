import { afterNextRender, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'webapp';

  constructor(private oidcSecurityService: OidcSecurityService) {
    afterNextRender(() => {
      this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => {
        console.log('app authenticated', isAuthenticated);
        console.log('environment.production', environment.production);
      });
    });
  }

  getEnvironment() {
    return environment.production;
  }


  login() {
    this.oidcSecurityService.authorize();
  }
  logout() {
    this.oidcSecurityService.logoff().subscribe((x) => console.log(x));
  }
}
