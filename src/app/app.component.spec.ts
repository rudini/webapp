import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth, StsConfigLoader } from 'angular-auth-oidc-client';
import { authConfigProviderFactory } from './core/auth/auth.config';
import { AppConfigService, initializeApp } from './app.config';
import { APP_INITIALIZER } from '@angular/core';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(),
        {
          provide: APP_INITIALIZER,
          useFactory: initializeApp,
          multi: true,
          deps: [AppConfigService],
        },
        provideAuth({
        loader: {
          provide: StsConfigLoader,
          useFactory: authConfigProviderFactory,
          deps: [AppConfigService]
        },
      })]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'webapp' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('webapp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, webapp');
  });
});
